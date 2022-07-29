import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Driver, DriverApplication } from '../interfaces/driver';
import { UserService } from './user.service';
import { drivers, initialize, driver_applications, rides } from './bucket'
import { VehicleService } from './vehicle.service';
import { of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DriverService {

	newDriver: DriverApplication;
	drivers: any;
	driverApplications: any;
	vehicleTypes: any[];
	realtimeDrivers: EventEmitter<any> = new EventEmitter();

	constructor(private http: HttpClient, private _userService: UserService, private _vehicleService: VehicleService) {
		initialize({
			identity: localStorage.getItem('identity')
		})
	}

	async getAll(admin) {
		await drivers.getAll({ queryParams: { relation: true, filter: { company: admin.company._id } } }).then(drivers => {
			this.drivers = drivers as Driver
		})
		return this.drivers
	}
	async getRealtime(admin) {
		return drivers.realtime.getAll({ filter: { is_verified: 1, is_online: 1, company: admin.company._id } })
	}
	getCompanyDrivers(admin) {
		return drivers.getAll({ queryParams: { relation: ['car.vehicle_type', 'user'], filter: { is_verified: 1, company: admin.company._id } } })
	}
	async addNewDriver(newDriver: DriverApplication) {
		await driver_applications.insert(newDriver)
	}
	async get(id: string) {
		return await drivers.getAll({ queryParams: { filter: { user: id }, relation: true } })
	}
	async getDriverApplications(company) {
		await driver_applications.getAll({queryParams:{filter:{company:company}}}).then(apps => {
			this.driverApplications = apps
		})
		return this.driverApplications
	}
	async getApplication(id: string) {
		return await driver_applications.get(id)
	}
	async getLastDrive(driverId) {
		return rides.getAll({ queryParams: { limit: 1, sort: { 'ride_start_at': 1 }, filter: { driver: driverId, status: { $nin: ['rejected', 'cancelled'] } } } })
	}
}

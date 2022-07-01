import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Driver, DriverApplication } from '../interfaces/driver';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { drivers, initialize, driver_applications, cars, Drivers } from './bucket'
import { first, switchMap, tap } from 'rxjs/operators';
import { VehicleService } from './vehicle.service';

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

	async getAll() {
		await drivers.getAll({ queryParams: { relation: true, filter: { is_verified: 1 } } }).then(drivers => {
			this.drivers = drivers as Driver
		})
		return this.drivers
	}
	async getRealtime(admin) {
		return drivers.realtime.getAll({ filter: { is_verified: 1, company: admin[0].company._id } })
	}
	getCompanyDrivers(admin) {
		return drivers.getAll({ queryParams: { relation: ['car.vehicle_type'], filter: { is_verified: 1, company: admin[0].company._id } } })
	}
	async addNewDriver(newDriver: DriverApplication) {
		await driver_applications.insert(newDriver)
	}
	async get(id: string) {
		return await drivers.getAll({ queryParams: { filter: { user: id }, relation: true } })
	}
	async getDriverApplications() {
		await driver_applications.getAll().then(apps => {
			this.driverApplications = apps
		})
		return this.driverApplications
	}
	async getApplication(id: string) {
		return await driver_applications.get(id)
	}
}

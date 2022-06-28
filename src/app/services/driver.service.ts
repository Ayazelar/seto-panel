import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Driver, DriverApplication } from '../interfaces/driver';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { drivers, initialize, driver_applications } from './bucket'

@Injectable({
	providedIn: 'root'
})
export class DriverService {

	newDriver: DriverApplication;
	drivers: any;
	driverApplications: any;

	constructor(private http: HttpClient, private _userService: UserService) {
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
	addNewDriver(newDriver: DriverApplication) {
		driver_applications.insert(newDriver)
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
	async getApplication(id:string){
		return await driver_applications.get(id)
	}
}

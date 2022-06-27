import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Driver, DriverApplication } from '../interfaces/driver';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { drivers, initialize } from './bucket'

@Injectable({
	providedIn: 'root'
})
export class DriverService {

	newDriver: DriverApplication;
	drivers: any;
	driverAplplications: DriverApplication[];

	constructor(private http: HttpClient, private _userService: UserService) {	
		initialize({
			identity:localStorage.getItem('identity')
		})
	}
	
	async getAll() {
		await drivers.getAll({queryParams:{relation:true,filter:{is_verified:1}}}).then(drivers=>{
			this.drivers = drivers as Driver
		})
		return this.drivers
	}
	addNewDriver(newDriver: DriverApplication) {


		// this.http.post(this.url,'bucketid')
		console.log(newDriver);
		// this._userService.addNewUser(newDriver.user)
	}
	async get(id: string) {
		return await drivers.getAll({queryParams:{filter:{user:id},relation:true}})
	}
	getDriverApplications() {
		return this.driverAplplications = [
			{
				user: {
					name: 'Ayaz',
					surname: 'elar',
					mobile_number: '054546584',
					email: 'ayazelar@gmail.com'
				},
				company_name: 'teknodev',
				driver: {
					licences: {
						driving: {
							id: '',
							pictures: [''],
							expiration: new Date()
						},
						taxi: {
							id: '',
							pictures: [''],
							expiration: new Date()
						}
					},
					identity: {
						id: '',
						pictures: ['']
					},
					profile_picture: ''
				},
				status: 'accepted'
			},
			{
				user: {
					name: 'Ayaz',
					surname: 'elar',
					mobile_number: '054546584',
					email: 'ayazelar@gmail.com'
				},
				company_name: 'teknodev',
				driver: {
					licences: {
						driving: {
							id: '',
							pictures: [''],
							expiration: new Date()
						},
						taxi: {
							id: '',
							pictures: [''],
							expiration: new Date()
						}
					},
					identity: {
						id: '',
						pictures: ['']
					},
					profile_picture: ''
				},
				status: 'rejected',
				status_message: 'REJECTED'
			}
		]
	}
}

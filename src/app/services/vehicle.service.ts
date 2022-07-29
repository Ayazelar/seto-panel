import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../interfaces/vehicle';
import { cars, initialize, car_applications } from './bucket'
import { UserService } from 'src/app/services/user.service';

@Injectable({
	providedIn: 'root'
})
export class VehicleService {

	url = environment.url;
	vehicles: any;
	vehicleApplications: any;
	newVehicle: Vehicle;

	constructor(private http: HttpClient, private _userService: UserService) {
		initialize({
			identity: localStorage.getItem('identity')
		})
	}

	async getAll(admin) {
		await cars.getAll({ queryParams: { relation: true, filter: { company: admin.company._id } } }).then(cars => {
			this.vehicles = cars
		})
		return this.vehicles
	}

	async addNewVehicle(vehicleValue: any) {
		let newVehicle = {
			model: vehicleValue.manufacturer + ' ' + vehicleValue.model,
			color: vehicleValue.color,
			licence_plate: vehicleValue.licensePlate,
			vehicle_licence_pictures: [vehicleValue.licensePicFront, vehicleValue.licensePicBack],
			year: vehicleValue.year,
			company: vehicleValue.company
		}
		await car_applications.insert(newVehicle)

	}
	get(id: string) {
		return cars.get(id)
	}
	async getVehicleApplications() {
		const admin = await this._userService.get()
		await car_applications.getAll({ queryParams: { filter: { company: admin.company._id } } }).then(apps => {
			this.vehicleApplications = apps
		})
		return this.vehicleApplications
	}
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../interfaces/vehicle';
import { cars, initialize,car_applications } from './bucket'

@Injectable({
	providedIn: 'root'
})
export class VehicleService {

	url = environment.url;
	vehicles: any;
	vehicleApplications: any;
	newVehicle: Vehicle;

	constructor(private http: HttpClient) {
		initialize({
			identity:localStorage.getItem('identity')
		})
	}

	async getAll() {
		await cars.getAll({queryParams:{relation:true}}).then(cars=>{
			this.vehicles = cars 
		})
		return this.vehicles
	}

	async addNewVehicle(vehicleValue: any) {
		
		let newVehicle = {
			model: vehicleValue.manufacturer + vehicleValue.model,
			color: vehicleValue.color,
			licence_plate: vehicleValue.licensePlate,
			vehicle_licence_pictures: [vehicleValue.licensePicBack, vehicleValue.licensePicBack],
			year: vehicleValue.year
		} 
		await car_applications.insert(newVehicle)

	}
	get(id: string) {
		return cars.get(id)
	}
	async getVehicleApplications() {
		await car_applications.getAll().then(apps=>{
			this.vehicleApplications = apps
		})
		return this.vehicleApplications
	}
}

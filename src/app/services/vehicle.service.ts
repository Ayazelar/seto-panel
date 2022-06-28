import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../interfaces/vehicle';
import { cars, initialize,vehicle_applications } from './bucket'

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

	addNewVehicle(vehicleValue: any) {
		console.log('SA');
		
		let newVehicle = {
			model: vehicleValue.manufacturer + vehicleValue.model,
			color: vehicleValue.color,
			licence_plate: vehicleValue.licensePlate,
			vehicle_licence_pictures: [vehicleValue.licensePicBack, vehicleValue.licensePicBack],
			year: vehicleValue.year
		} 
		vehicle_applications.insert(newVehicle)

	}
	get(id: string) {
		return cars.get(id)
	}
	async getVehicleApplications() {
		await vehicle_applications.getAll().then(apps=>{
			this.vehicleApplications = apps
		})
		return this.vehicleApplications
	}
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../interfaces/vehicle';
import { cars, initialize } from './bucket'

@Injectable({
	providedIn: 'root'
})
export class VehicleService {

	url = environment.url;
	vehicles: any;
	vehicleApplications: Vehicle[]
	newVehicle: Vehicle;

	constructor(private http: HttpClient) {
	}

	async getAll() {
		await cars.getAll({queryParams:{relation:true}}).then(cars=>{
			this.vehicles = cars 
		})
		return this.vehicles
	}

	addNewVehicle(vehicleValue: any) {
		this.newVehicle = {
			model: vehicleValue.manufacturer + vehicleValue.model,
			color: vehicleValue.color,
			licence_plate: vehicleValue.licensePlate,
			vehicle_licence_pictures: [vehicleValue.licensePicBack, vehicleValue.licensePicBack],
			year: vehicleValue.year
		}
		console.log(this.newVehicle);

	}
	get(id: string) {
		return cars.get(id)
	}
	getVehicleApplications() {
		return this.vehicleApplications = [
			{
				model: 'A4',
				year: '2010',
				color: 'Black',
				licence_plate: '07 AS 201',
				vehicle_licence_pictures: ['pic'],
				status: 'pending',
				status_message: 'FOR NOT ALLOWED'
			}
		]
	}
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {

  vehicles: Vehicle[];
  keys = ['model', 'color', 'vehicle_number']

  constructor(private _router: Router, private _vehicleService: VehicleService) { }


  ngOnInit(): void {
    this.getVehicles()
  }

  async getVehicles() {
    this.vehicles = await this._vehicleService.getAll();
  }

  renameKey(key: string) {
    key = key.replace('_', ' ')

    return key;
  }

  navigateToVehicle(id:string){
    this._router.navigate(['panel/vehicle-details',id])
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {

  isLoading: boolean = false;
  vehicles: Vehicle[];
  keys = ['model', 'color', 'vehicle_number']

  constructor(private _router: Router, private _vehicleService: VehicleService, private _userService: UserService) { }


  ngOnInit(): void {
    this.getVehicles()
  }

  async getVehicles() {
    this.isLoading = true
    const admin = await this._userService.get()
    this.vehicles = await this._vehicleService.getAll(admin);
    this.isLoading = false
  }

  renameKey(key: string) {
    key = key.replace('_', ' ')

    return key;
  }

  navigateToVehicle(id: string) {
    this._router.navigate(['panel/vehicle-details', id])
  }
}

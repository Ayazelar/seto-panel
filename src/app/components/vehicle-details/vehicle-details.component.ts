import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {

  isLoading: boolean = false;
  vehicle: any;
  keys = ['model', 'vehicle_number', 'construction_year', 'color']
  constructor(private _route: ActivatedRoute, private _vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.getVehicle()
  }
  async getVehicle() {
    this.isLoading = true;
    await this._vehicleService.get(this._route.snapshot.paramMap.get('id')).then(vehicle => {
      this.vehicle = vehicle
    })
    this.isLoading = false
  }
  getStatus(value: string) {
    if (value == 'status_message') {
      return true
    }
    else {
      return false
    }
  }
}

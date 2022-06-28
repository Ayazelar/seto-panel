import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-applications',
  templateUrl: './vehicle-applications.component.html',
  styleUrls: ['./vehicle-applications.component.scss']
})
export class VehicleApplicationsComponent implements OnInit {

  keys = ['model', 'color', 'year', 'status'];
  vehicleApplications: Vehicle[] = [];

  constructor(private _router: Router, private _vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.getVehicleApplications()
  }
  navigateToAddVehicle() {
    this._router.navigate(['panel/add-vehicle'])
  }
  getVehicleApplications() {

    this._vehicleService.getVehicleApplications().then(vehicleApplications => {
      this.vehicleApplications = vehicleApplications
      console.log(this.vehicleApplications);
    })
  }
  navigateToDetails(id: string) {
    this._router.navigate(['panel/vehicle-details/', JSON.stringify(id)])
  }

  renameKey(key: string) {
    key = key.replace('_', ' ')
    return key;
  }
}

import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {

  vehicleValue = {
    manufacturer: '',
    model: '',
    year: '',
    licensePlate: '',
    color: '',
    licensePicFront: '',
    licensePicBack: ''
  }

  constructor(private _vehicleService:VehicleService) { }

  ngOnInit(): void {
  }
  imagePreview(selector: String, image: any) {
    const reader = new FileReader();
    console.log(selector);
    reader.readAsDataURL(image.target.files[0]);
    reader.onload = () => {

      this.vehicleValue[selector as keyof typeof this.vehicleValue] = reader.result as string

    };
  }
  addNewVehicle(){
    this._vehicleService.addNewVehicle(this.vehicleValue)
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {

  header: string;
  icon: string;
  loading: boolean = false;
  vehicleValue = {
    manufacturer: '',
    model: '',
    year: '',
    licensePlate: '',
    color: '',
    licensePicFront: '',
    licensePicBack: ''
  }

  constructor(private _vehicleService:VehicleService,private confirmationService: ConfirmationService,private _router: Router) { }

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
  async addNewVehicle(){
    this.loading = true
    await this._vehicleService.addNewVehicle(this.vehicleValue).then(() => {
      this.header = 'Successful';
      this.icon = 'pi pi-check-circle';
      setTimeout(()=>{
        this.showStatusMessage('Driver application successfully created')
      },100)
    }).catch(() => {
      this.header = 'Error';
      this.icon = 'pi pi-ban';
      setTimeout(()=>{
        this.showStatusMessage('Something went wrong')
      },100)
    })
    this.loading = false
  }
  showStatusMessage(message): any {

    this.confirmationService.confirm({
      message: message,
      accept: () => {
        this._router.navigate(['panel/vehicle-applications'])
      },
      reject: () => {
        this._router.navigate(['panel/vehicle-applications'])
      }
    });
  }
}

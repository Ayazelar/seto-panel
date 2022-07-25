import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from 'src/app/services/user.service';
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
  vehicleValue: any = {
    manufacturer: '',
    model: '',
    year: '',
    licensePlate: '',
    color: '',
    licensePicFront: '',
    licensePicBack: '',
  }

  constructor(private _vehicleService: VehicleService, private _userService: UserService, private confirmationService: ConfirmationService, private _router: Router, private _imageService: ImageService) { }

  ngOnInit(): void {
  }
  imagePreview(key: String, image) {
    const reader = new FileReader();
    reader.readAsDataURL(image.target.files[0]);
    reader.onload = () => {
      let result = reader.result as string
      let mimetype = result.split(';')[0].split(':')[1];
      this.saveImage(result, mimetype, key);
    };
  }

  async saveImage(data, mimetype, key) {
    let file_buf = this._imageService.toBuffer(data);
    let bufWithMeta = {
      contentType: mimetype,
      data: file_buf,
      name: 'image',
    };
    let imageId;
    await this._imageService.insert(bufWithMeta, imageId).then((res) => {
      this.vehicleValue[key] = res.url
    });
  }
  async addNewVehicle() {
    this.loading = true
    this.vehicleValue.company = await this._userService.get().then(u => u.company._id)
    await this._vehicleService.addNewVehicle(this.vehicleValue).then(() => {
      this.header = 'Successful';
      this.icon = 'pi pi-check-circle';
      setTimeout(() => {
        this.showStatusMessage('Driver application successfully created')
      }, 100)
    }).catch(() => {
      this.header = 'Error';
      this.icon = 'pi pi-ban';
      setTimeout(() => {
        this.showStatusMessage('Something went wrong')
      }, 100)
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

import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Company } from 'src/app/interfaces/company';
import { DriverApplication } from 'src/app/interfaces/driver';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss']
})
export class AddDriverComponent implements OnInit {

  header: string;
  icon: string;
  isLoading: boolean = false;
  driverValue = {
    profilePicture: '',
    name: '',
    surname: '',
    id: '',
    driver_licence: {
      expiration: '',
      licence_number: ''
    },
    taxi_licence: {
      licence_number: '',
      expiration: ''
    },
    identityPic: '',
    drivingLicencePic: '',
    taxiLicencePicFront: '',
    taxiLicencePicBack: '',
    email: '',
    mobile_number: '',
    company_name: ''
  };

  constructor(private _driverService: DriverService, private confirmationService: ConfirmationService,private _router: Router) { }

  ngOnInit(): void {
  }

  async addNewDriver() {
    this.isLoading = true
    let newDriver = {
      driver: {
        licences: {
          driving: {
            id: this.driverValue.driver_licence.licence_number,
            pictures: [this.driverValue.drivingLicencePic],
            expiration: new Date(this.driverValue.driver_licence.expiration)
          },
          taxi: {
            id: this.driverValue.taxi_licence.licence_number,
            pictures: [this.driverValue.taxiLicencePicBack, this.driverValue.taxiLicencePicFront],
            expiration: new Date(this.driverValue.taxi_licence.expiration)
          }
        },
        identity: {
          id: this.driverValue.id,
          pictures: [this.driverValue.identityPic]
        },
        profile_picture: this.driverValue.profilePicture
      },
      user: {
        name: this.driverValue.name,
        surname: this.driverValue.surname,
        email: this.driverValue.email,
        mobile_number: this.driverValue.mobile_number
      },
      company_name: this.driverValue.company_name
    }
    await this._driverService.addNewDriver(newDriver).then(() => {
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
    this.isLoading = false;
  }

  imagePreview(selector: String, image: any) {
    const reader = new FileReader();
    console.log(selector);
    reader.readAsDataURL(image.target.files[0]);
    reader.onload = () => {

      if (selector == 'profilePicture') {
        this.driverValue.profilePicture = reader.result as string
      }
      else if (selector == 'identityPic') {
        this.driverValue.identityPic = reader.result as string
      }
      else if (selector == 'drivingLicensePic') {
        this.driverValue.drivingLicencePic = reader.result as string
      }
      else if (selector == 'taxiLicensePicFront') {
        this.driverValue.taxiLicencePicFront = reader.result as string
      }
      else {
        this.driverValue.taxiLicencePicBack = reader.result as string
      }
    };
  }
  showStatusMessage(message): any {

    this.confirmationService.confirm({
      message: message,
      accept: () => {
        this._router.navigate(['panel/driver-applications'])
      },
      reject: () => {
        this._router.navigate(['panel/driver-applications'])
      }
    });
  }
}

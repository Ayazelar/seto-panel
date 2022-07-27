import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Company } from 'src/app/interfaces/company';
import { DriverApplication } from 'src/app/interfaces/driver';
import { DriverService } from 'src/app/services/driver.service';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from 'src/app/services/user.service';

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
  };

  constructor(private _driverService: DriverService,private _userService:UserService, private confirmationService: ConfirmationService,private _router: Router,private _imageService: ImageService) { }

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
      company:await this._userService.get().then(u => u.company._id)
    }
    await this._driverService.addNewDriver(newDriver as any).then(() => {
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
      if (key == 'profilePicture') {
        this.driverValue.profilePicture = res.url
      }
      else if (key == 'identityPic') {
        this.driverValue.identityPic = res.url
      }
      else if (key == 'drivingLicensePic') {
        this.driverValue.drivingLicencePic = res.url
      }
      else if (key == 'taxiLicensePicFront') {
        this.driverValue.taxiLicencePicFront = res.url
      }
      else {
        this.driverValue.taxiLicencePicBack = res.url
      }
    });
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

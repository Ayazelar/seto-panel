import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DriverApplication } from 'src/app/interfaces/driver';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-driver-applications',
  templateUrl: './driver-applications.component.html',
  styleUrls: ['./driver-applications.component.scss']
})
export class DriverApplicationsComponent implements OnInit {

  isLoading: boolean = false;
  driverApplications: DriverApplication[] = [];
  keys = ['name', 'surname', 'email'];

  constructor(private _router: Router, private _driverService: DriverService) { }

  ngOnInit(): void {
    this.getDriverApplications()

  }
  navigateToAddDriver() {
    this._router.navigate(['panel/add-driver'])
  }
  async getDriverApplications() {
    this.isLoading = true
    console.log('LOAD1',this.isLoading);
    
    await this._driverService.getDriverApplications().then(drivers => {
      drivers.map((driver: DriverApplication) => {
        let mappedDriver = {
          ...driver,
          ...driver.user
        }
        delete mappedDriver.user;
        this.driverApplications.push(mappedDriver)
      });
      this.isLoading = false;  
      console.log('LOAD2',this.isLoading);

    })
  }

  renameKey(key: string) {
    key = key.replace('_', ' ')

    return key;
  }
  navigateToDetail(id: string) {
    this._router.navigate(['panel/driver-application-detail/', id])
  }

}

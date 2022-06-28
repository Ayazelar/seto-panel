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

  driverApplications: DriverApplication[]=[];
  keys = ['name','surname','email'];

  constructor(private _router: Router, private _driverService: DriverService) { }

  ngOnInit(): void {
    this.getDriverApplications()

  }
  navigateToAddDriver() {
    this._router.navigate(['panel/add-driver'])
  }
  getDriverApplications() {
    let driverApps = this._driverService.getDriverApplications()
    driverApps.then(drivers=>{
      drivers.map((driver:DriverApplication) => {
        let mappedDriver = {
          ...driver,
          ...driver.user
        }
        delete mappedDriver.user;
        this.driverApplications.push(mappedDriver)
      });
      console.log(this.driverApplications);
      
      // const mappedDriver = {
      //   ...driver,
      //   ...driver.user
      // }
      // delete mappedDriver.user;      
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

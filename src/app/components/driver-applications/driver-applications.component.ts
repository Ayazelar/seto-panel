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

  driverApplications: DriverApplication[];
  keys: string[]=[];

  constructor(private _router: Router, private _driverService: DriverService) { }

  ngOnInit(): void {
    this.getDriverApplications()

  }
  navigateToAddDriver() {
    this._router.navigate(['panel/add-driver'])
  }
  getDriverApplications() {
    this.driverApplications = this._driverService.getDriverApplications().map(driverApplication => {
      const mappedDriverApplication = {
        ...driverApplication,
        ...driverApplication.user
      }
      delete mappedDriverApplication.driver
      delete mappedDriverApplication.user
      delete mappedDriverApplication.company_name
      delete mappedDriverApplication.mobile_number

      return mappedDriverApplication
    })
    this.keys = Object.keys(this.driverApplications[0])
    this.keys.sort((a, b) => a.localeCompare(b)) 
    
  }

  renameKey(key: string) {
    key = key.replace('_', ' ')
    
    return key;
  }
  navigateToDetails(id: string) {
    this._router.navigate(['panel/driver-details/', JSON.stringify(id)])
  }

}

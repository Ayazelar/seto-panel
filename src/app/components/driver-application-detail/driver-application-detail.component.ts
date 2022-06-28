import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DriverApplication } from 'src/app/interfaces/driver';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-driver-application-detail',
  templateUrl: './driver-application-detail.component.html',
  styleUrls: ['./driver-application-detail.component.scss']
})
export class DriverApplicationDetailComponent implements OnInit {

  application: any;
  keys = ['name','surname','company_name','email','mobile_number','status']
  constructor(private _route: ActivatedRoute,private _driverService:DriverService) { }

  ngOnInit(): void {
    this.getApplication()
  }
  async getApplication(){
    this.application = await this._driverService.getApplication(this._route.snapshot.paramMap.get('id'))
    this.application = {
      ...this.application,
      ...this.application.user
    }
    delete this.application.user
    console.log(this.application);
    
  }
}

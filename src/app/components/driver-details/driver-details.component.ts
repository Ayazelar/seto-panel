import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Driver } from 'src/app/interfaces/driver';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.scss']
})
export class DriverDetailsComponent implements OnInit {

  driver: Driver;
  keys = ['name','surname','email','mobile_number']

  constructor(private _route:ActivatedRoute,private _driverService:DriverService ) { }

  ngOnInit(): void {
    this.getDriver()
  }
  async getDriver(){
    await this._driverService.get(this._route.snapshot.paramMap.get('id')).then(driver=>{
      this.driver = driver[0] as Driver
    })
    this.driver = {
      ...this.driver,
      ...this.driver.user
    }
    delete this.driver.user
    console.log(this.driver);
    
  }

  getStatus(value:string){
    if(value=='status_message'){
      return true
    }
    else{
      return false
    }
  }

}

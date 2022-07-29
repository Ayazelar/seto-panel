import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Driver } from 'src/app/interfaces/driver';
import { DriverService } from '../../services/driver.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {

  drivers: Driver[]=[];
  keys = ['name','surname','email','is_online']
  loading: boolean = false;
  
  constructor(private _router: Router,private _driverService: DriverService,private _userService: UserService) {

  }

  ngOnInit(): void {
    this.getDrivers()
  }

  async getDrivers(){
    this.loading = true
    let allDirvers = await this._driverService.getAll();
    
    allDirvers.map(driver=>{
      const mappedDriver = {
        ...driver,
        ...driver.user
      }
      delete mappedDriver.user;      
      this.drivers.push(mappedDriver);
    })
    this.loading = false
      
  }
  
  navigateToDriver(id:string){
    this._router.navigate(['panel/driver-details',id])
  }

  renameKey(key: string) {
    key = key.replace('_', ' ')
    
    return key;
  }
}

import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { DriverService } from 'src/app/services/driver.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements AfterViewInit {
  private map;


  private initMap(): void {
    this.map = L.map('map', {
      center: [48.20, 16.37],
      zoom: 13,
      worldCopyJump: true,
      maxBounds: [
        //south west
        [48.11, 16.17],
        //north east
        [48.31, 16.57]
      ],
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 17,
      minZoom: 12,

    });

    tiles.addTo(this.map);
    L.layerGroup().addTo(this.map);
  }
  greenIcon = L.icon({
    iconUrl: '../assets/img/car-marker.png',

    iconSize: [38, 38]
  })
  drivers: any = [];

  constructor(private _driverService: DriverService, private _userService: UserService) {
  }

  async ngAfterViewInit() {
    await this.getDriverCordinates()
    this.initMap();
  }
  async getDriverCordinates() {
    const admin = await this._userService.get() as any
    let companyDrivers = await this._driverService.getCompanyDrivers(admin) as any
    (await this._driverService.getRealtime(admin)).subscribe(drivers => {
      this.drivers = []
      drivers.forEach(driver => {
        companyDrivers.forEach(companyDriver => {
          if (companyDriver._id == driver._id) {
            companyDriver.location = driver.location
            this.drivers.push(companyDriver)
          }
        })
      })
      this.setMarkers()
    })

  }
  setMarkers() {
    this.map.eachLayer((layer) => {
      if (layer['_latlng'] != undefined)
        layer.remove();
    });

    this.drivers.forEach(driver => {
      const marker = L.marker([driver.location.coordinates[1], driver.location.coordinates[0]], {
        icon: L.icon({
          iconUrl: driver.car.vehicle_type.image,
          iconSize: [undefined, 20]
        })
      })
      marker.addTo(this.map)
    })
  }

}

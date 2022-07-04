import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet/dist/leaflet'
import 'leaflet-routing-machine'
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
  onlineDrivers: any;
  onTripDrivers: any;
  waitingDrivers: any;
  companyDrivers: any;
  filterVal: any;
  selectedDriver: any;
  activeTab: any;
  drive: any;
  driveLoading: boolean = false;

  constructor(private _driverService: DriverService, private _userService: UserService) {
  }

  async ngAfterViewInit() {
    await this.getDriverCordinates()
    this.initMap();
  }
  async getDriverCordinates() {
    const admin = await this._userService.get() as any
    this.companyDrivers = await this._driverService.getCompanyDrivers(admin) as any
    console.log(this.companyDrivers);

    (await this._driverService.getRealtime(admin)).subscribe(drivers => {
      this.drivers = []
      drivers.forEach(driver => {
        this.companyDrivers.forEach(companyDriver => {
          if (companyDriver._id == driver._id) {
            companyDriver.location = driver.location
            this.drivers.push(companyDriver)
          }
        })
      })
      this.onlineDrivers = this.drivers
      if (this.selectedDriver) {
        this.selectedDriverOnChange()
        return
      }
      this.setDriversMarker()
    })
  }


  clearMarkers() {
    this.map.eachLayer((layer) => {
      if (layer['_latlng'] != undefined)
        layer.remove();
    });
  }

  selectedDriverOnChange() {

    this.clearMarkers();

    if (!this.selectedDriver) {
      this.setDriversMarker()
      return
    }
    this.map.panTo(new L.LatLng(this.selectedDriver.location.coordinates[1], this.selectedDriver.location.coordinates[0]));
    let marker = L.marker([this.selectedDriver.location.coordinates[1], this.selectedDriver.location.coordinates[0]], {
      icon: L.icon({
        iconUrl: this.selectedDriver.car.vehicle_type.image,
        iconSize: [undefined, 20]
      })
    })
    marker.addTo(this.map)
  }

  setDriversMarker() {
    this.clearMarkers();
    this.map.panTo(new L.LatLng(48.20, 16.37));


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
  changeTab(event) {
    let allDrivers = this.drivers
    this.activeTab = event
    if (event == 0) {
      this.onlineDrivers = allDrivers.filter(driver => {
        return driver.is_online === 1
      })
    }
    else if (event == 1) {
      this.onTripDrivers = allDrivers.filter(driver => {
        return driver.is_riding === 1
      })
    } else {
      this.waitingDrivers = allDrivers.filter(driver => {
        return driver.is_riding === 0
      })
    }
  }
  test() {
    this.selectedDriver = null
    this.drive = undefined
    this.setDriversMarker()

  }
  async getLastDrive(driver) {
    this.driveLoading = true
    await this._driverService.getLastDrive(driver._id).then(drive => {
      this.drive = drive[0]
      console.log(this.drive);

    })
    L.Routing.control({
      waypoints: [
        L.latLng(this.drive.location_from.coordinates[1], this.drive.location_from.coordinates[0]),
        L.latLng(this.drive.location_to.coordinates[1], this.drive.location_to.coordinates[0]),
      ],
      routeWhileDragging: false,
      draggableWaypoints: false,
      addWaypoints: false
    }).addTo(this.map);
    this.driveLoading = false
  }
}

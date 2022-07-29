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
    const tiles = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 17,
      minZoom: 12,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    tiles.addTo(this.map);
    L.layerGroup().addTo(this.map);
  }

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
  routing: any;

  constructor(private _driverService: DriverService, private _userService: UserService) {
  }

  async ngAfterViewInit() {
    await this.getDriverCordinates()
    this.initMap();
  }
  async getDriverCordinates() {
    const admin = await this._userService.get() as any
    this.companyDrivers = await this._driverService.getCompanyDrivers(admin) as any

    (await this._driverService.getRealtime(admin)).subscribe(drivers => {
      this.setDrivers(admin, drivers)
    })
  }

  async setDrivers(admin, drivers) {
    this.companyDrivers = await this._driverService.getCompanyDrivers(admin) as any
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
  }


  clearMarkers() {
    this.map.eachLayer((layer) => {
      if (layer['_latlng'] != undefined)
        layer.remove();
    })
  }

  selectedDriverOnChange() {

    this.clearMarkers();

    if (!this.selectedDriver) {
      this.setDriversMarker()
      return
    }
    
    if (this.selectedDriver.is_riding && !this.drive) {
      this.getLastDrive(this.selectedDriver)
    }

    if (this.drive) {
      this.setDriveMarkers()
    }else{
      this.map.panTo(new L.LatLng(this.selectedDriver.location.coordinates[1], this.selectedDriver.location.coordinates[0]));
    }
    let markValue = this.drivers.find(driver => {
      return driver._id == this.selectedDriver._id
    })
    let marker = L.marker([markValue.location.coordinates[1], markValue.location.coordinates[0]], {
      icon: L.icon({
        iconUrl: this.selectedDriver.car.vehicle_type.image,
        iconSize: [undefined, 25]
      })
    })
    marker.addTo(this.map)
  }

  setDriversMarker() {
    this.clearMarkers();

    this.drivers.forEach(driver => {
      const marker = L.marker([driver.location.coordinates[1], driver.location.coordinates[0]], {
        icon: L.icon({
          iconUrl: driver.car.vehicle_type.image,
          iconSize: [undefined, 25]
        })
      })
      const popupOptions = {
        className: "popup",
        closeButton: false
      }
      marker.addTo(this.map).bindPopup(`<div class='popup'>
        <div class='img-name'><img src=${driver.user.image}> <span>${driver.user.name} ${driver.user.surname}</span></div>
        <ion-label>
          <div><span>Model:</span> <p>${driver.car.model}</p></div>
          <div><span>Number:</span> <p>${driver.car.vehicle_number}</p></div>
          <div><span>Year:</span> <p>${driver.car.construction_year}</p></div>
          <div><span>Color:</span> <p>${driver.car.color}</p></div>
          <div><span>Status:</span> <p>${driver.is_riding ? 'On Trip' : 'Waiting'}</p></div>
        </ion-label>
      </div>`, popupOptions)
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

  clearMap() {
    
    if (this.routing) {
      this.map.removeControl(this.routing);
      this.routing = null;
    }
    this.selectedDriver = null
    this.drive = undefined
    this.setDriversMarker()

  }

  async getLastDrive(driver) {
    this.driveLoading = true

    await this._driverService.getLastDrive(driver._id).then(drive => {
      this.drive = drive[0]
    })
    if (this.drive) {
      this.createMapRoute()
    }

    this.driveLoading = false
  }

  createMapRoute() {
    this.routing = L.Routing.control({
      waypoints: [
        L.latLng(this.drive.location_from.coordinates[1], this.drive.location_from.coordinates[0]),
        L.latLng(this.drive.location_to.coordinates[1], this.drive.location_to.coordinates[0]),
      ],
      routeWhileDragging: false,
      draggableWaypoints: false,
      addWaypoints: false,
      lineOptions: {
        styles: [{ color: '#00b0ff', opacity: 1, weight: 5 }]
      },
    }).addTo(this.map);
    this.setDriveMarkers()
  }

  setDriveMarkers() {

    L.marker([this.drive.location_from.coordinates[1], this.drive.location_from.coordinates[0]], {
      icon: L.icon({
        iconUrl: '../assets/img/start.png',
        iconSize: [50, 50],
        iconAnchor: [25, 45],
      })
    }).addTo(this.map)

    L.marker([this.drive.location_to.coordinates[1], this.drive.location_to.coordinates[0]], {
      icon: L.icon({
        iconUrl: '../assets/img/end.png',
        iconSize: [38, 40],
        iconAnchor: [20, 40],
      })
    }).addTo(this.map)

  }
}

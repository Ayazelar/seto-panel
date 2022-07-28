import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  items: any;

  constructor(private _router: Router,private translate:TranslateService) { }

  ngOnInit(): void {
    
    this.items = [
      {
        label: this.translate.instant("dashboard"),
        expanded: true,
        items: [
          { label: 'Dashboard', icon: 'pi pi-server', command: () => { this._router.navigate(['panel/dashboard']) } },
          { label: 'Exploration Map', icon: 'pi pi-car', command: () => { this._router.navigate(['panel/map']) } }
        ]
      },
      {
        label: 'Fleet',
        items: [
          { label: 'Drivers', icon: 'pi pi-users', command: () => { this._router.navigate(['panel/drivers']) } },
          { label: 'Vehicles', icon: 'pi pi-car', command: () => { this._router.navigate(['panel/vehicles']) } }
        ]
      },
      {
        label: 'Applications',
        items: [
          { label: 'Driver', icon: 'pi pi-user', command: () => { this._router.navigate(['panel/driver-applications']) } },
          { label: 'Vehicle', icon: 'pi pi-car', command: () => { this._router.navigate(['panel/vehicle-applications']) } }
        ]
      },
      {
        label: 'Invoices',
        items: [
          { label: 'Rider invoices', icon: 'pi pi-file', command: () => { this._router.navigate(['panel/rider-invoices']) } },
          { label: 'Company invoices', icon: 'pi pi-file', command: () => { this._router.navigate(['panel/company-invoices']) } },
        ]
      },
      {
        label: 'Profile',
        items: [
          { label: 'My Profile', icon: 'pi pi-user', command: () => { this._router.navigate(['panel/profile']) } }
        ]
      },
      {
        label: 'Actions',
        items: [
          { label: 'Logout', icon: 'pi pi-user-minus', command: () => { localStorage.removeItem('identity');localStorage.removeItem('profile');this._router.navigate(['login']) } }
        ]
      },
    ]
  }

}

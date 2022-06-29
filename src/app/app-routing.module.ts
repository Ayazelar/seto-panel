import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DriversComponent } from './components/drivers/drivers.component';
import { LoginComponent } from './components/login/login.component';
import { PanelComponent } from './components/panel/panel.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { AddDriverComponent } from './components/add-driver/add-driver.component';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { VehicleApplicationsComponent } from './components/vehicle-applications/vehicle-applications.component'
import { DriverApplicationsComponent } from './components/driver-applications/driver-applications.component'
import { AuthGuard } from './services/auth.guard';
import { DriverDetailsComponent } from './components/driver-details/driver-details.component';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DriverApplicationDetailComponent } from './components/driver-application-detail/driver-application-detail.component';
import { MapComponent } from './components/map/map.component';



const routes: Routes = [
  {
    path: '', redirectTo: 'panel/dashboard', pathMatch: 'full'
  },
  {
    path: 'panel', component: PanelComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: 'drivers', component: DriversComponent
      },
      {
        path: 'vehicles', component: VehiclesComponent
      },
      {
        path: 'profile', component: MyProfileComponent
      },
      {
        path: 'add-driver', component: AddDriverComponent
      },
      {
        path: 'add-vehicle', component: AddVehicleComponent
      },
      {
        path: 'driver-applications', component: DriverApplicationsComponent
      },
      {
        path: 'vehicle-applications', component: VehicleApplicationsComponent
      },
      {
        path: 'driver-details/:id', component: DriverDetailsComponent
      },
      {
        path: 'vehicle-details/:id', component: VehicleDetailsComponent
      },
      {
        path: 'driver-application-detail/:id', component: DriverApplicationDetailComponent
      },
      {
        path: 'map', component: MapComponent
      }
    ]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'sign-up', component: SignUpComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

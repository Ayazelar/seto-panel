import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';
import { TableModule } from 'primeng/table';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from "@angular/forms";
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelComponent } from './components/panel/panel.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DriversComponent } from './components/drivers/drivers.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { LoginComponent } from './components/login/login.component';
import { AddDriverComponent } from './components/add-driver/add-driver.component';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { AvatarModule } from 'primeng/avatar';
import { ListComponent } from './components/list/list.component';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { DriverApplicationsComponent } from './components/driver-applications/driver-applications.component';
import { VehicleApplicationsComponent } from './components/vehicle-applications/vehicle-applications.component';
import { AuthGuard } from './services/auth.guard';
import { DriverDetailsComponent } from './components/driver-details/driver-details.component';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';
import { TypeofPipe } from './pipes/typeof.pipe';
import { SortByNamePipe } from './pipes/sort-by-name.pipe';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DriverApplicationDetailComponent } from './components/driver-application-detail/driver-application-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    NavbarComponent,
    DashboardComponent,
    DriversComponent,
    VehiclesComponent,
    MyProfileComponent,
    LoginComponent,
    AddDriverComponent,
    ListComponent,
    AddVehicleComponent,
    DriverApplicationsComponent,
    VehicleApplicationsComponent,
    DriverDetailsComponent,
    VehicleDetailsComponent,
    TypeofPipe,
    SortByNamePipe,
    SignUpComponent,
    DriverApplicationDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    SplitterModule,
    TableModule,
    BrowserAnimationsModule,
    PanelMenuModule,
    InputTextModule,
    FileUploadModule,
    HttpClientModule,
    AvatarModule,
    DropdownModule,
    FormsModule,
    CalendarModule,
    InputTextareaModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    SkeletonModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    CheckboxModule,
    ConfirmDialogModule,
  ],
  providers: [AuthGuard, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

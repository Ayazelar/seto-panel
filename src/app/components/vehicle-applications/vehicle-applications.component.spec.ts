import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleApplicationsComponent } from './vehicle-applications.component';

describe('VehicleApplicationsComponent', () => {
  let component: VehicleApplicationsComponent;
  let fixture: ComponentFixture<VehicleApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleApplicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

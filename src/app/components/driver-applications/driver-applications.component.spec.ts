import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverApplicationsComponent } from './driver-applications.component';

describe('DriverApplicationsComponent', () => {
  let component: DriverApplicationsComponent;
  let fixture: ComponentFixture<DriverApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverApplicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

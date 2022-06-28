import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverApplicationDetailComponent } from './driver-application-detail.component';

describe('DriverApplicationDetailComponent', () => {
  let component: DriverApplicationDetailComponent;
  let fixture: ComponentFixture<DriverApplicationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverApplicationDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverApplicationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

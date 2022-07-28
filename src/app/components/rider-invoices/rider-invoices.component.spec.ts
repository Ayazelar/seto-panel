import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderInvoicesComponent } from './rider-invoices.component';

describe('RiderInvoicesComponent', () => {
  let component: RiderInvoicesComponent;
  let fixture: ComponentFixture<RiderInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiderInvoicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiderInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

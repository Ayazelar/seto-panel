import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInvoicesComponent } from './company-invoices.component';

describe('CompanyInvoicesComponent', () => {
  let component: CompanyInvoicesComponent;
  let fixture: ComponentFixture<CompanyInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyInvoicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

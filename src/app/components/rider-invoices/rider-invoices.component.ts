import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { DriverService } from 'src/app/services/driver.service';
import { InvoicesService } from 'src/app/services/invoices.service';
import { PaymentMethodService } from 'src/app/services/payment-method.service';

@Component({
  selector: 'app-rider-invoices',
  templateUrl: './rider-invoices.component.html',
  styleUrls: ['./rider-invoices.component.scss'],
})
export class RiderInvoicesComponent implements OnInit {
  selectedMonth: Date = new Date();

  drivers: { _id: string; fullname: string }[] = [];
  selectedDrivers: string[] = [];

  paymentMethods: { _id: string; title: string }[] = [];
  selectedPaymentMethods: string[] = [];

  invoices: {
    created_at: Date;
    driver: string;
    price: string;
    payment_method: string;
  }[] = [];

  keys = ['created_at', 'driver', 'price', 'payment_method'];

  $refresh = new BehaviorSubject(this.getFilter());

  constructor(
    private driverService: DriverService,
    private paymentMethodService: PaymentMethodService,
    private invoicesService: InvoicesService
  ) {}

  ngOnInit(): void {
    this.driverService
      .getDrivers()
      .toPromise()
      .then((drivers) => (this.drivers = drivers));

    this.paymentMethodService
      .getAll()
      .toPromise()
      .then((paymentMethods) => (this.paymentMethods = paymentMethods));

    this.$refresh
      .pipe(switchMap((filter) => this.invoicesService.getAll(filter)))
      .subscribe((invoices) => (this.invoices = invoices));
  }

  onFilterChange() {
    const filter = this.getFilter();
    return this.$refresh.next(filter);
  }

  getFilter() {
    const from = new Date(
      this.selectedMonth.getFullYear(),
      this.selectedMonth.getMonth(),
      0,
      0,
      0,
      0,
      0
    );
    const to = new Date(
      this.selectedMonth.getFullYear(),
      this.selectedMonth.getMonth() + 1,
      0,
      0,
      0,
      0,
      0
    );

    return {
      dateRange: {
        from,
        to,
      },
      drivers: this.selectedDrivers,
      paymentMethods: this.selectedPaymentMethods,
    };
  }
}

import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, generate, switchMap } from 'rxjs';
import { Driver } from 'src/app/interfaces/driver';
import { User } from 'src/app/interfaces/user';
import { Rider_Invoices } from 'src/app/services/bucket';
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
      .getAll()
      .then((drivers) => (this.drivers = this.mapDrivers(drivers)));

    this.paymentMethodService
      .getAll()
      .then((paymentMethods) => (this.paymentMethods = paymentMethods));

    this.$refresh
      .pipe(switchMap((filter) => this.invoicesService.getAll(filter)))
      .subscribe(
        (invoices) => (this.invoices = this.mapInvoices(invoices as any))
      );
  }

  generateFullName(user: User) {
    return `${user.name} ${user.surname}`;
  }

  mapDrivers(drivers: Driver[]) {
    return drivers.map((d) => {
      return {
        _id: d._id,
        fullname: this.generateFullName(d.user),
      };
    });
  }

  mapInvoices(invoices: Rider_Invoices[]) {
    return invoices.map((i) => {
      return {
        created_at: new Date(i.created_at),
        driver: this.generateFullName(i.driver as User),
        payment_method: i.payment_method.title,
        price: i.price.toString(),
        file: i.file,
      };
    });
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

  openFile(fileUrl: string) {
    window.open(fileUrl, '_blank');
  }
}

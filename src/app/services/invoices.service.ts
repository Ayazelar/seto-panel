import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  constructor() {}

  getAll(filter: {
    dateRange: { from: Date; to: Date };
    drivers: string[];
    paymentMethods: string[];
  }) {
    let preparedFilter: any = {};

    preparedFilter.created_at = {
      $gte: `Date(${filter.dateRange.from})`,
      $lte: `Date(${filter.dateRange.to})`,
    };

    if (filter.drivers.length) {
      preparedFilter.drivers = {
        $in: filter.drivers,
      };
    }

    if (filter.paymentMethods.length) {
      preparedFilter.paymentMethods = {
        $in: filter.paymentMethods,
      };
    }

    // call the service here
    return of([
      {
        created_at: new Date(),
        driver: 'Mahmut',
        price: '$12',
        payment_method: 'Cash',
      },
      {
        created_at: new Date(),
        driver: 'Necmi',
        price: '$29',
        payment_method: 'Card',
      },
    ]);
  }
}

import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { rider_invoices } from '../services/bucket';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  constructor(private userService: UserService) {}

  async getAll(filter: {
    dateRange: { from: Date; to: Date };
    drivers: string[];
    paymentMethods: string[];
  }) {
    let preparedFilter: any = {};

    preparedFilter.created_at = {
      $gte: `Date(${filter.dateRange.from.toISOString()})`,
      $lte: `Date(${filter.dateRange.to.toISOString()})`,
    };

    if (filter.drivers.length) {
      preparedFilter['driver.id'] = {
        $in: filter.drivers,
      };
    }

    if (filter.paymentMethods.length) {
      preparedFilter["payment_method.id"] = { $in: filter.paymentMethods } 
    }

    const user = await this.userService.get();
    return rider_invoices.getAll({
      queryParams: { filter: { ...preparedFilter } },
    });
  }
}

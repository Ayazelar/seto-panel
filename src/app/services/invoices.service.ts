import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { invoices } from './bucket';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  constructor(private userService: UserService) {}

  async getAll(filter: {
    type: string;
    dateRange: { from: Date; to: Date };
    drivers: string[];
    paymentMethods: string[];
  }) {
    let preparedFilter: any = {};

    preparedFilter.type = filter.type;

    preparedFilter.created_at = {
      $gte: `Date(${filter.dateRange.from.toISOString()})`,
      $lte: `Date(${filter.dateRange.to.toISOString()})`,
    };

    if (filter.drivers.length) {
      preparedFilter['ride.driver._id'] = {
        $in: filter.drivers,
      };
    }

    if (filter.paymentMethods.length) {
      preparedFilter['ride.payment_method._id'] = {
        $in: filter.paymentMethods,
      };
    }

    const companyAdmin = await this.userService.get();
    const additionalFilter = {};
    switch (filter.type) {
      case 'rider':
        additionalFilter['sender.id'] = companyAdmin.company._id;
        break;
      case 'company':
        additionalFilter['client.id'] = companyAdmin.company._id;
        break;

      default:
        throw Error(`Received unknown invoice type ${filter.type}`);
        break;
    }
    return invoices.getAll({
      queryParams: {
        filter: { ...preparedFilter, ...additionalFilter },
        relation: ['ride.driver.user', 'ride.payment_method'],
      },
    });
  }
}

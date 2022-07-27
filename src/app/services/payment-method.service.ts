import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { payment_methods } from '../services/bucket';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodService {
  constructor() {}

  getAll(filter: { ids: string[] } = { ids: [] }) {
    let preparedFilter: any = {};

    if (filter.ids.length) {
      preparedFilter._id = {
        $in: filter.ids,
      };
    }
    return payment_methods.getAll({
      queryParams: { filter: preparedFilter },
    }) as Promise<any>;
  }
}

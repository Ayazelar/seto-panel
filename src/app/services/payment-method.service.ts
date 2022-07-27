import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  constructor() { }

  // mock method 
  getAll(){
    return of([
      {
        _id:"1",
        title:"Card",
      },
      {
        _id:"2",
        title:"Stripe",
      }
    ])
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CompanyApplication } from '../interfaces/company';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  signUp(signUpValue:CompanyApplication) {
    console.log(signUpValue);
    return this.http.post(`${environment.url}/fn-execute/company`,signUpValue).toPromise()
  }
}

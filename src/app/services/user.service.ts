import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { company_admins, initialize } from './bucket'
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  constructor(private http: HttpClient) {
    initialize({
      identity: localStorage.getItem('identity')
    })
  }

  get() {
    let cachedProfile = localStorage.getItem("profile")

    if (!cachedProfile) {
      const user_info = jwt_decode(localStorage.getItem('identity')) as any;
      return company_admins.getAll({ queryParams: { filter: { email: user_info.identifier }, relation: true } }).then((r) => {
        localStorage.setItem("profile", JSON.stringify(r[0]));
        return r[0]
      })
    }

    return Promise.resolve(JSON.parse(cachedProfile))
  }

  addNewUser(userValue: User) {
    // this.http.post()
  }
}

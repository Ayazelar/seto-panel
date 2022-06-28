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
    let user_info = jwt_decode(localStorage.getItem('identity')) as any    
    return company_admins.getAll({queryParams:{filter:{email:user_info.identifier},relation:true}})
  }
  addNewUser(userValue: User) {
    // this.http.post()
  }
}

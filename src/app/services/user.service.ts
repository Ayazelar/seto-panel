import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { users, initialize } from './bucket'
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  constructor(private http: HttpClient) {
    initialize({
      apikey: '5xwu18l44bh1uw'
    })
  }

  get() {
    let user_info = jwt_decode(localStorage.getItem('identity')) as any
    
    return users.get(user_info._id)
  }
  addNewUser(userValue: User) {
    // this.http.post()
  }
}

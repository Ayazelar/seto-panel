import { Injectable } from '@angular/core';
import * as Identity from "@spica-devkit/identity";
import { environment } from 'src/environments/environment';
import { initialize } from '../services/bucket';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async login(loginValue: any) {
    Identity.initialize({ identity: undefined, publicUrl: environment.url });
    let JWT = await Identity.login(loginValue.email, loginValue.password)
    return JWT
  }
  onUserLoggedIn(token) {
    const initParams = {
      identity:token,
      publicUrl:environment.url
    }
    localStorage.setItem('identity',token)
    Identity.initialize(initParams)
    initialize(initParams)
  }
}

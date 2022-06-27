import { Injectable } from '@angular/core';
import * as Identity from "@spica-devkit/identity";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async login(loginValue:any) {
    Identity.initialize({identity: "", publicUrl: environment.url});
    // Identity.login("<USER IDENTIFIER>","<USER PASSWORD>","<EXPIRATION IN SECONDS>")
    let JWT = await Identity.login(loginValue.email,loginValue.password)
    return JWT
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  constructor(private _router: Router, private _authService: AuthService, private _messageService: MessageService) { }
  rememberMe: boolean = false;
  isLoading: boolean = false;
  loginValue = {
    email: '',
    password: ''
  }

  ngOnInit(): void {
    this.checkRemember()
  }

  navigateToSignup() {
    this._router.navigate(['sign-up'])
  }

  async login() {
    this.isLoading = true;
    await this._authService.login(this.loginValue).then(jwt => {
      const admin = jwt_decode(jwt);
      if (this.isApproved(admin)) {
        if (this.rememberMe) {
          localStorage.setItem('remember_me', JSON.stringify(this.loginValue))
        }else{
          localStorage.removeItem('remember_me')
        }
        this._authService.onUserLoggedIn(jwt)
        this._router.navigate(['panel/dashboard'])
      } else {
        this.showRoleErrToast()
      }
    }).catch(() => {
      this.showErrToast()
    }).finally(() => {
      this.isLoading = false
    });
  }

  isApproved(admin) {
    return admin.attributes.role == "company_admin"
  }

  showRoleErrToast() {
    this._messageService.add({ severity: 'info', summary: 'Your Role Not Valid' });
  }

  showErrToast() {
    this._messageService.add({ severity: 'error', summary: 'Identifier or password was incorrect.' });
  }
  checkRemember() {
    const rememberVal = JSON.parse(localStorage.getItem('remember_me'))
    if (rememberVal) {
      this.loginValue = rememberVal
      this.rememberMe = true
    }
  }
}

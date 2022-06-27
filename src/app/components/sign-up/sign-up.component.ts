import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyApplication } from 'src/app/interfaces/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  companyApplication: CompanyApplication = {
    company: {
      name: '',
      short_name: '',
    },
    admin: {
      name: '',
      surname: '',
      phone_number: '',
      email: '',
      password:'',
    }
  }

  constructor(private _router: Router, private _companyService: CompanyService) { }

  ngOnInit(): void {
  }

  navigateToSignin() {
    this._router.navigate(['login'])
  }

  signUp() {
    this._companyService.signUp(this.companyApplication)
  }
}

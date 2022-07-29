import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CompanyApplication } from 'src/app/interfaces/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [MessageService]

})
export class SignUpComponent implements OnInit {

  companyApplication: any = {
    company: {
      name: '',
      zip: '',
      city: '',
      address: '',
      country: ''
    },
    admin: {
      name: '',
      surname: '',
      phone_number: '',
      email: '',
      password: '',
    }
  }
  loading: boolean = false;

  constructor(private _router: Router, private _companyService: CompanyService, private _messageService: MessageService) { }

  ngOnInit(): void {
  }

  navigateToSignin() {
    this._router.navigate(['login'])
  }

  async signUp() {
    this.loading = true
    await this._companyService.signUp(this.companyApplication).then((r: any) => {
      this._messageService.add({ severity: 'info', summary: r.message })

      for (let field in this.companyApplication.company) this.companyApplication.company[field] = '';
      for (let field in this.companyApplication.admin) this.companyApplication.admin[field] = '';

    }).catch((e) => {
      this._messageService.add({ severity: 'error', summary: e.error.message.message });
    }).finally(() => {
      this.loading = false
    })

  }
}

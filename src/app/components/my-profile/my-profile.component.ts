import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  isLoading: boolean = true;
  user: any;
  keys = ['name', 'surname', 'email', 'phone_number', 'company']
  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.getProfile()
  }

  async getProfile() {
    this.isLoading
    await this._userService.get().then(user => {
      this.user = {
        ...user,
        company: user.company.name
      }
    })
    this.isLoading = false;
  }
}

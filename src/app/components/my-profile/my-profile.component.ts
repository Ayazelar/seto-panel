import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  user:User;
  constructor(private _userService:UserService) { }

  async ngOnInit() {
    await this._userService.get().then(user=>{
      this.user = user as User
    })
    console.log(this.user);
    
  }

}

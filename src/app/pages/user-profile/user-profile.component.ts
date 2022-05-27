import { Component, OnInit } from '@angular/core';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { UserModel } from 'src/app/models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public user: UserModel;
  public imagen="assets/img/theme/team-4-800x800.jpg";
  constructor(private uss: UserStorageService) { }

  ngOnInit() {
    this.user = this.uss.user;
    this.imagen="https://api.ronnie.es/uploads/club/"+this.user.id+"/profile/"+this.user.logo;
    console.log(this.user);
  }

}

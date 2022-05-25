import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { UserModel } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  public user: UserModel;
  public imagen="assets/img/theme/team-4-800x800.jpg";
  constructor(location: Location,  private element: ElementRef, private router: Router, private uss: UserStorageService) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.user = this.uss.user;
    this.imagen="https://api.ronnie.es/uploads/club/"+this.user.id+"/profile/"+this.user.logo;
    console.log(this.user);
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  signOut(){
    this.uss.destroy();
    this.router.navigate(['/login']);
  }

}

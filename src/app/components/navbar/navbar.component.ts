import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { UserModel } from 'src/app/models/user';
import { PostService } from 'src/app/services/post.service';

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
  public filter:any='';
  public results:any=[];
  constructor(location: Location,  private element: ElementRef, private router: Router, private uss: UserStorageService, private ps: PostService) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.user = this.uss.user;
    if (this.user.logo==null) {
      this.imagen="assets/img/manager/avatar_user.png";
    }else{
      this.imagen="https://api.ronnie.es/uploads/club/"+this.user.id+"/profile/"+this.user.logo;
    }
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

  search(){
    console.log(this.filter.length)
    if (this.filter.length==0) {
      this.results=[];
    }else{
      let fil='filter=firstname,LIKE,%'+this.filter+'%'+'&order=firstname,desc'+'&limit=10';
      let self =this; 
      console.log(fil)
      this.ps.search(fil).subscribe({
        next(data){
          self.results=data;  
          console.log(self.results); 
          for (let i = 0; i < self.results.length; i++) {
            if (self.results[i].picture!=null) {
              self.results[i].imagen="https://api.ronnie.es/uploads/user/"+self.results[i].id+"/profile/"+self.results[i].picture;
            }else{
              self.results[i].imagen="assets/img/manager/avatar_user.png";
            }
          }
        },error(err){
          console.log(err);
        }
      })
    }
  }

  limpiar(){
    this.results=[];
  }

  signOut(){
    this.uss.destroy();
    this.router.navigate(['/login']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Inicio',  icon: 'fa-home text-primary', class: 'ws' },
    /*{ path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' },*/

    { path: '/scooting', title: 'Scooting',  icon:'fa-compass text-primary', class: 'ws' },
    { path: '/promo', title: 'Promocionados',  icon:'fa-bolt text-primary', class: '' },
    /*{ path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' }*/
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  public seguidores:any=[];

  constructor(private router: Router, private ps: PostService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
    let self=this;
    setTimeout(() => {
      this.ps.seguidores().subscribe({
        next(data){
          console.log(data);
          self.seguidores=data;
          for (let i = 0; i < self.seguidores.length; i++) {
            //self.post[i].user_data.imagen="https://api.ronnie.es/uploads/user/"+self.post[i].user_data.id+"/profile/"+self.post[i].user_data.picture;
            //self.post[i].post_data.video="https://api.ronnie.es/"+self.post[i].post_data.url;
          }
          console.log(self.seguidores)
        },error(err){
          console.log(err);
        }
      })
    }, 250);

  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Panel',  icon: 'ni-tv-2 text-primary', class: '' },
    /*{ path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' },*/

    { path: '/clubs', title: 'Clubs',  icon:'ni-trophy text-yellow', class: '' },
    { path: '/players', title: 'Jugadores',  icon:'ni-user-run text-blue', class: '' },
    { path: '/users', title: 'Usuarios',  icon:'ni-circle-08 text-info', class: '' },
    { path: '/pays', title: 'Pagos',  icon:'ni-money-coins text-success', class: '' },
    { path: '/user-profile', title: 'Perfil',  icon:'ni-single-02 text-red', class: '' },
    { path: '/inbox', title: 'Mensajes',  icon:'ni-email-83 text-info', class: '' },
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

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}

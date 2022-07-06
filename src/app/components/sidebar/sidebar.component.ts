import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  public lista_seguidores:any=[];

  constructor(private router: Router, private ps: PostService,public elementRef: ElementRef) { }

  ngOnInit() {

    const dom: HTMLElement = this.elementRef.nativeElement;
    const elements = dom.querySelectorAll('.list__button--click');


    elements.forEach(elements => {
      elements.addEventListener('click', ()=>{
          elements.classList.toggle('arrow');
          let height = 0;
          let menu = elements.nextElementSibling;
          if(menu.clientHeight === 0){
              height=menu.scrollHeight;
              //menu.setAttribute("class","abrir");
              menu.setAttribute("style", "height:"+`${height}px`+";");
          }else{
            //menu.setAttribute("class","cerrar")
            menu.setAttribute("style", "height:"+0+";");;
          }
          
          //menu.style.height = `${height}px`;
  
      })
    });



    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });



    let self=this;
    setTimeout(() => {
      this.ps.seguidores().subscribe({
        next(data){
          self.seguidores=data;
          self.lista_seguidores=self.seguidores.user_list;
          for (let i = 0; i < self.lista_seguidores.length; i++) {
            if (self.lista_seguidores[i].picture!=null) {
              self.lista_seguidores[i].imagen="https://api.ronnie.es/uploads/user/"+self.lista_seguidores[i].id+"/profile/"+self.lista_seguidores[i].picture;
            }else{
              self.lista_seguidores[i].imagen="assets/img/manager/avatar_user.png";
            }
          }
        },error(err){
          console.log(err);
        }
      })
    }, 250);

  }

  public reset(){
    let self=this;
    this.ps.seguidores().subscribe({
      next(data){
        alert('entro');
        console.log(data);
        self.seguidores=data;
        self.lista_seguidores=self.seguidores.user_list;
        for (let i = 0; i < self.lista_seguidores.length; i++) {
          if (self.lista_seguidores[i].picture!=null) {
            self.lista_seguidores[i].imagen="https://api.ronnie.es/uploads/user/"+self.lista_seguidores[i].id+"/profile/"+self.lista_seguidores[i].picture;
          }else{
            self.lista_seguidores[i].imagen="assets/img/manager/avatar_user.png";
          }
        }
        console.log(self.lista_seguidores)
      },error(err){
        console.log(err);
      }
    })
  }
  public abrio:boolean=false;
  abrir(){
    if (this.abrio==true) {
      this.abrio=false;
    }else{
      this.abrio=true;
    }
    console.log(this.abrio);
    return this.abrio;
  }

  
}

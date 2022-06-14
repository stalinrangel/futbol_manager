import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css']
})
export class PromoComponent implements OnInit {

  public post:any=[];
  public mostrar=false;
  constructor(private p:PostService){}

  ngOnInit() {
    let self=this;
    setTimeout(() => {
      this.p.scooting().subscribe({
        next(data){
          console.log(data);
          self.post=data;
          for (let i = 0; i < self.post.length; i++) {
            self.post[i].user_data.imagen="https://api.ronnie.es/uploads/user/"+self.post[i].user_data.id+"/profile/"+self.post[i].user_data.picture;
            self.post[i].post_data.video="https://api.ronnie.es/"+self.post[i].post_data.url;
          }
          console.log(self.post)
          self.mostrar=true;
        },error(err){
          console.log(err);
        }
      })
    }, 250); 
  }

}

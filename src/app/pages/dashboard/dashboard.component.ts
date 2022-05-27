import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public post:any=[];
  public mostrar=false;
  constructor(private p:PostService){}

  ngOnInit() {
    let self=this;
    setTimeout(() => {
      this.p.home().subscribe({
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

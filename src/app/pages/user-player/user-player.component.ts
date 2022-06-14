import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerModel } from 'src/app/models/player';
import { UserModel } from 'src/app/models/user';
import { PostService } from 'src/app/services/post.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-player',
  templateUrl: './user-player.component.html',
  styleUrls: ['./user-player.component.css']
})
export class UserPlayerComponent implements OnInit {

  public e=environment;
  page = 2;
  page1 = 3;
  active = 1;
  active1 = 1;
  active2 = 1;
  private id:any;
  public post:any=[];
  public user: UserModel;
  public player: PlayerModel= new PlayerModel();;
  public imagen="assets/img/theme/team-4-800x800.jpg";
  constructor(private route: ActivatedRoute, private ps:PostService, private uss: UserStorageService, private activatedRoute: ActivatedRoute) { 
    //this.route.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {

    this.activatedRoute.paramMap
    .subscribe((params) => {
      this.id = params.get('id');
      console.log(this.id);
      this.getDatos();
    });
    //this.id = this.route.snapshot.paramMap.get('id');

  }
  
  getDatos(){
    let self=this;
    setTimeout(() => {
      self.user_post(self.id);
      self.user_info(self.id);

    }, 250);
  }

  user_post(id){
    let self=this;
    this.ps.user_post(id).subscribe({
      next(data){
        self.post=data;
        console.log(self.post)
        for (let i = 0; i < self.post.length; i++) {
          //self.post[i].user_data.imagen="https://api.ronnie.es/uploads/user/"+self.post[i].user_data.id+"/profile/"+self.post[i].user_data.picture;
          self.post[i].post_data.video="https://api.ronnie.es/"+self.post[i].post_data.url;
        }
        console.log(self.post)
      },error(err){
        console.log(err);
      }
    })
  }

  user_info(id){
    let self=this;
    this.ps.user_info(id).subscribe({
      next(data){
        console.log(data);
        self.player=data;
        self.imagen="https://api.ronnie.es/uploads/user/"+self.id+"/profile/"+self.player.picture;
      },error(err){
        console.log(err);
      }
    })
  }

}

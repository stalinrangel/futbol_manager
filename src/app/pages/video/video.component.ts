import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerModel } from 'src/app/models/player';
import { UserModel } from 'src/app/models/user';
import { PostService } from 'src/app/services/post.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  private id:any;
  public post:any=[];
  public post_id:any=[];
  public user: UserModel;
  public player: PlayerModel= new PlayerModel();;
  public imagen="assets/img/theme/team-4-800x800.jpg";
  public seguido=false;
  public isfollow='Seguir';
  page = 2;
  page1 = 3;
  active = 1;
  active1 = 1;
  active2 = 1;
  public video:any;
  constructor(private t: ToastService,private activatedRoute: ActivatedRoute, private router: Router, private ps:PostService) { }

  ngOnInit(): void {
    let self=this;
    this.activatedRoute.paramMap
    .subscribe((params) => {
      this.id = params.get('id');
      console.log(this.id);
      //console.log(self.activatedRoute.snapshot.paramMap.get('post'));
      //console.log(self.activatedRoute.snapshot.paramMap.get('user'));
      this.post=JSON.parse(self.activatedRoute.snapshot.paramMap.get('post'));
      this.player=JSON.parse(self.activatedRoute.snapshot.paramMap.get('user'));
      for (let i = 0; i < this.post.length; i++) {
        if (this.post[i].id==this.id) {
          this.video=this.post[i];
        }
      }
      console.log(this.player);
      console.log(this.video)
      //this.getDatos();
    });
  }

  getDatos(){
    let self=this;
    setTimeout(() => {
      self.user_post(self.player.id);
      self.user_info(self.player.id);

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
        self.player.imagen="https://api.ronnie.es/uploads/user/"+self.id+"/profile/"+self.player.picture;
        self.player.id=this.id;
      },error(err){
        console.log(err);
      }
    })
  }

  ir(id_post, posts){
    console.log(id_post)
    this.router.navigate(['/video/'+id_post, {post: JSON.stringify(posts),user: JSON.stringify(this.player)}]);
  }

  follow(){
    let self=this;
    this.ps.follow(self.id).subscribe({
      next(data){
        console.log(data);
        self.player.isFollowing=true;
        self.t.showInfo(data.msg)
      },error(err){
        console.log(err);
      }
    })
    
  }

  unfollow(){
    let self=this;
    this.ps.follow(self.id).subscribe({
      next(data){
        console.log(data);
        self.player.isFollowing=false;
        self.t.showInfo(data.msg)
      },error(err){
        console.log(err);
      }
    })
  }

}

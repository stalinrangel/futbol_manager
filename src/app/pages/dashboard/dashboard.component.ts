import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import noUiSlider from "nouislider";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public post:any=[];
  public mostrar=false;
  public slider2:any;
  public slider3:any;

  public eshow=false;
  public edad_min:any;
  public edad_max:any;

  public ashow=false;
  public altura_min:any;
  public altura_max:any;

  constructor(private p:PostService, private router: Router){}

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

  ngAfterViewInit(){
    
    this.slider2 = document.getElementById("edad");
    let self=this;

    noUiSlider.create(this.slider2, {
      start: [4, 15],
      connect: true,
      range: {
        min: 0,
        max: 60
      },
      behaviour: 'tap-drag',
      tooltips: true,
    });

    this.slider2.noUiSlider.on('update', function (values, handle) {
          if (handle==0) {
            self.altura_min=values[handle];
          }else if (handle==1) {
            self.altura_max=values[handle];
          }
      });

    // Altura------------
    this.slider3 = document.getElementById("altura");

    noUiSlider.create(this.slider3, {
      start: [1.70, 1.9],
      connect: true,
      range: {
        min: 0.40,
        max: 2.30
      },
      behaviour: 'tap-drag',
      tooltips: true,
      //format: wNumb({
        //  decimals: 0
     // }),
    });
    
    this.slider3.noUiSlider.on('update', function (values, handle) {
          if (handle==0) {
            self.edad_min=values[handle];
          }else if (handle==1) {
            self.edad_max=values[handle];
          }
      });

      
  }

  show_edad(){
    console.log(this.edad_min,this.edad_max,this.eshow)
    if (this.eshow==true){this.eshow=false;}
    else{ this.eshow=true;}
  }
  show_altura(){
    console.log(this.altura_min,this.altura_max,this.ashow)
    if (this.ashow==true){this.ashow=false;}
    else{ this.ashow=true;}
  }

  scooting(item){
    console.log(item);
    let data={
      id: item.id,
      to_user: 1,
      to_type: 'club'
    }
    this.p.send_post(data).subscribe({
      next(data){
        console.log(data);
        
      },error(err){
        console.log(err);
      }
    })
  }

  ir(id_post, posts){
    console.log(id_post)
    console.log(posts)
    this.router.navigate(['/video/'+id_post, {post: JSON.stringify(posts),user: JSON.stringify(posts[0].user_data)}]);
  }

}

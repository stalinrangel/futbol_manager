import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  public listo:boolean=false;
  public categorias:any=[];
  public sections:any=[];
  public players:any=[];
  public trainers:any=[];
  public divisions:any=[];
  public jugador:any={
    name:'',
    category:'',
    section:'',
    division:''
  }

  constructor(private p: PostService) { }

  ngOnInit(): void {
    this.get_players();
    this.get_categorias();
    this.get_divisiones();
    this.get_trainers();
  }

  get_trainers(){
    let self=this;
    this.p.club_coach().subscribe({
      next(data){
        console.log(data);
        self.trainers=data;
      },error(err){
        console.log(err);
      }
    })
  }

  get_players(){
    let self=this;
    this.p.club_players().subscribe({
      next(data){
        console.log(data);
        self.players=data;
        for (let i = 0; i < self.players.length; i++) {
          self.players[i].user_data.imagen="https://api.ronnie.es/uploads/user/"+self.players[i].user_data.id+"/profile/"+self.players[i].user_data.picture;
        }
      },error(err){
        console.log(err);
      }
    })
  }

  get_divisiones(){
    let self=this;
    this.p.divisions().subscribe({
      next(data){
        //console.log(data);
        self.divisions=data;
      },error(err){
        console.log(err);
      }
    })
  }

  get_categorias(){
    let self=this;
    this.p.categories().subscribe({
      next(data){
        self.categorias=data;

        self.seccion();
      },error(err){
        console.log(err);
      }
    })
  }

  seccion(){
    let self=this;
    this.p.section().subscribe({
      next(data){
        //console.log(data);
        self.sections=data;
        if (self.sections.length>0) {
          for (let i = 0; i < self.categorias.length; i++) {
            self.categorias[i].sections=[];
            self.categorias[i].ver=false;
            for (let j = 0; j < self.sections.length; j++) {
              if (self.sections[j].category_id==self.categorias[i].id) {
                self.categorias[i].sections.push(self.sections[j]);
              }
            }
          }
        }
       // console.log(self.categorias);
        self.listo=true;
      },error(err){
        console.log(err);
      }
    })
  }

  selec_categoria(id){
    let self=this;
    for (let i = 0; i < self.categorias.length; i++) {
        if (self.categorias[i].id==id) {
          self.categorias[i].ver=true;
        }else{
          self.categorias[i].ver=false;
        }
    }
  }

  selec_section(categoria_id,seccion_id){
    console.log(categoria_id,seccion_id)
  }

  create(){
    console.log(this.jugador)
  }
}

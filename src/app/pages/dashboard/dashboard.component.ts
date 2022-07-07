import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import noUiSlider from "nouislider";
import wNumb from 'wnumb';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public post:any=[];
  public positions=[];
  public mostrar=false;
  public slider2:any;
  public slider3:any;

  public esexo=false;
  public val_sexo:any={
    id:null,
    name:null
  };

  public eposicion=false;
  public val_posicion:any={
    id:null,
    name:null
  };

  public s_team='';
  public original_team=[];
  public team=[];
  public eteam=false;
  public val_team:any={
    id:null,
    name:null
  };

  public epierna=false; 
  public val_pierna:any=null;

  public eshow=false;
  public edad_min:any;
  public edad_max:any;
  public val_edad:any={
    birthday_start: null,
    birthday_end: null,
    min: null,
    max: null
  };

  public ashow=false;
  public altura_min:any;
  public altura_max:any;
  public val_altura:any={
    player_height_start: null,
    player_height_end: null,
    min: null,
    max: null
  };

  public countrys:any=[];
  public states:any=[];
  public provinces:any=[];
  public divisiones:any=[];

  public s_countrys='';
  public s_states='';
  public s_provinces='';
  public s_divisiones='';

  public ecountrys=false;
  public estates=false;
  public eprovinces=false;
  public edivisiones=false;
  
  public val_countrys:any={
    id:null,
    name:null
  };
  public val_states:any={
    id:null,
    name:null
  };
  public val_provinces:any={
    id:null,
    name:null
  };
  public val_divisiones:any={
    id:null,
    name:null
  };
  
  constructor(private p:PostService, private router: Router, private toast: ToastService){}

  ngOnInit() {
    let self=this;
    //setTimeout(() => {
      this.p.home().subscribe({
        next(data){
          //console.log(data);
          self.post=data;
          for (let i = 0; i < self.post.length; i++) {
            self.post[i].user_data.imagen="https://api.ronnie.es/uploads/user/"+self.post[i].user_data.id+"/profile/"+self.post[i].user_data.picture;
            self.post[i].post_data.video="https://api.ronnie.es/"+self.post[i].post_data.url;
            self.post[i].post_data.mini="https://api.ronnie.es/"+self.post[i].post_data.thumbnail;
            
          }
          console.log(self.post)
          self.mostrar=true;
        },error(err){
          console.log(err);
          self.toast.showError(err.error.err);
        }
      })

      this.p.positions().subscribe({
        next(data){
          //console.log(data);
          self.positions=data;
        },error(err){
          console.log(err);
          self.toast.showError(err.error.err);
        }
      })

      this.p.clubs().subscribe({
        next(data){
          //console.log(data);
          //self.team=data;
          self.original_team=data;
        },error(err){
          console.log(err);
          self.toast.showError(err.error.err);
        }
      })
    //}, 250);
    setTimeout(() => {
      this.gets();
    }, 1250);
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.val_edad={
        birthday_start: null,
        birthday_end: null,
        min: null,
        max: null
      };
      this.val_altura={
        player_height_start: null,
        player_height_end: null,
        min: null,
        max: null
      };
    }, 10);

    
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
      format: wNumb({
        decimals: 0
      }),
    });

    this.slider2.noUiSlider.on('update', function (values, handle) {
          console.log(handle)
          let date=new Date();
          date.setFullYear(date.getFullYear()-values[handle]);
          let datesend=date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate();
          if (handle==0) {
            self.edad_min=values[handle];
            self.val_edad.birthday_end=datesend;
            self.val_edad.min=values[handle];
          }else if (handle==1) {
            self.edad_max=values[handle];
            self.val_edad.birthday_start=datesend;
            self.val_edad.max=values[handle];
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
      
    });
    
    this.slider3.noUiSlider.on('update', function (values, handle) {
      console.log(handle)
          if (handle==0) {
            
            self.altura_min=values[handle];
            self.val_altura.player_height_start=values[handle];
            self.val_altura.min=values[handle];
          }else if (handle==1) {
            
            self.altura_max=values[handle];
            self.val_altura.player_height_end=values[handle];
            self.val_altura.max=values[handle];
          }
      });

      
  }

  gets(){
    let self=this;
    this.p.country().subscribe({
      next(data){
        console.log(data);
        //this.countrys=data;
        self.countrys.push({
          "code": "ES",
          "dial_code": "+34",
          "name_en": "España",
          "name_es": "España",
        })
      },error(err){
        console.log(err);
      }
    })

    this.p.divisions().subscribe({
      next(data){
        console.log(data);
        self.divisiones=data;
      },error(err){
        console.log(err);
      }
    })

    /*this.p.add_club_players().subscribe({
      next(data){
        console.log(data);
      },error(err){
        console.log(err);
      }
    })
    */
  }

  get_state(id){
    let self=this;
    this.p.state(id).subscribe({
      next(data){
        console.log(data);
        self.states=data;
      },error(err){
        console.log(err);
      }
    })
  }

  get_province(id){
    let self=this;
    this.p.province(id).subscribe({
      next(data){
        console.log(data);
        self.provinces=data;
      },error(err){
        console.log(err);
      }
    })
  }

  search_team() {
    console.log(this.s_team)

    this.team = this.original_team.filter(item => item.name.toLowerCase().indexOf(this.s_team.toLowerCase()) !== -1);
  }

  get_team(id){
    console.log(id)
    for (let i = 0; i < this.original_team.length; i++) {
      if (this.original_team[i].id==id) {
        this.val_team={
          id:id,
          name:this.original_team[i].name
        };
        this.eteam=false;
      }
      
    }
  }

  show_sexo(){
    if (this.esexo==true){this.esexo=false;}
    else{ this.esexo=true;}
  }
  show_posicion(){
    if (this.eposicion==true){this.eposicion=false;}
    else{ this.eposicion=true;}
  }
  show_team(){
    if (this.eteam==true){this.eteam=false;}
    else{ this.eteam=true;}
  }
  show_pierna(){
    if (this.epierna==true){this.epierna=false;}
    else{ this.epierna=true;}
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
  show_countrys(){
    if (this.ecountrys==true){this.ecountrys=false;}
    else{ this.ecountrys=true;}
  }
  show_states(){
    if (this.estates==true){this.estates=false;}
    else{ this.estates=true;}
  }
  show_provinces(){
    if (this.eprovinces==true){this.eprovinces=false;}
    else{ this.eprovinces=true;}
  }

  show_divisiones(){
    if (this.edivisiones==true){this.edivisiones=false;}
    else{ this.edivisiones=true;}
  }

  selec_sexo(val,val2){
    console.log(val)
    this.val_sexo={
      id:val,
      name:val2
    };
    this.esexo=false;
  }
  delete_sexo(){
    this.val_sexo={
      id:null,
      name:null
    };
    this.set_filter();
  }
  selec_pierna(val){
    console.log(val)
    this.val_pierna=val;
    this.epierna=false;
  }
  delete_pierna(){
    this.val_pierna=null;
    this.set_filter();
  }
  selec_posicion(val,val2){
    console.log(val)
    this.val_posicion={
      id:val,
      name:val2
    };
    this.eposicion=false;
  }
  selec_team(val,val2){
    console.log(val)
    this.val_team={
      id:val,
      name:val2
    };
    this.eteam=false;
  }
  delete_posicion(){
    this.val_posicion={
      id:null,
      name:null
    };
    this.set_filter();
  }
  delete_team(){
    this.val_team={
      id:null,
      name:null
    };
    this.set_filter();
  }

  delete_edad(){
    this.val_edad={
      birthday_start: null,
      birthday_end: null,
      min: null,
      max: null
    };
    this.eshow=false;
    this.set_filter();
  }

  delete_altura(){
    this.val_altura={
      player_height_start: null,
      player_height_end: null,
      min: null,
      max: null
    };
    this.ashow=false;
    this.set_filter();
  }
  
  get_countrys(id){
    this.selec_countrys(1,"España");
  }
  selec_countrys(val,val2){
    console.log(val)
    this.val_countrys={
      id:val,
      name:val2
    };
    this.ecountrys=false;
    this.get_state(val);
  }
  delete_countrys(){
    this.val_countrys={
      id:null,
      name:null
    };
    this.set_filter();
  }

  get_states(id){
    for (let i = 0; i < this.states.length; i++) {
      if (this.states[i]==id) {
        this.selec_states(id,id);
      }
    }
  }
  selec_states(val,val2){
    console.log(val)
    this.val_states={
      id:val,
      name:val2
    };
    this.estates=false;
    this.get_province(val);
  }
  delete_states(){
    this.val_countrys={
      id:null,
      name:null
    };
    this.val_states={
      id:null,
      name:null
    };
    this.set_filter();
  }

  get_provinces(id){
    for (let i = 0; i < this.provinces.length; i++) {
      if (this.provinces[i]==id) {
        this.selec_provinces(id,id);
      }
    }
  }
  selec_provinces(val,val2){
    console.log(val)
    this.val_provinces={
      id:val,
      name:val2
    };
    this.eprovinces=false;
  }
  delete_provinces(){
    this.val_countrys={
      id:null,
      name:null
    };
    this.val_states={
      id:null,
      name:null
    };
    this.val_provinces={
      id:null,
      name:null
    };
    this.set_filter();
  }

  get_divisiones(id){
    for (let i = 0; i < this.divisiones.length; i++) {
      console.log(this.divisiones[i].id,parseInt(id))
      if (this.divisiones[i].id==parseInt(id)) {
        this.selec_divisiones(this.divisiones[i].id,this.divisiones[i].name);
      }
    }
  }
  selec_divisiones(val,val2){
    console.log(val)
    this.val_divisiones={
      id:val,
      name:val2
    };
    this.edivisiones=false;
  }
  delete_divisiones(){
    this.val_divisiones={
      id:null,
      name:null
    };
    this.set_filter();
  }

  set_filter(){
    let data='';
    if (this.val_altura.player_height_start) {
      data=data+'&player_height_start='+this.val_altura.player_height_start;
    }
    if (this.val_altura.player_height_end) {
      data=data+'&player_height_end='+this.val_altura.player_height_end;
    }
    if (this.val_edad.birthday_start) {
      data=data+'&birthday_start='+this.val_edad.birthday_start;
    }
    if (this.val_edad.birthday_end) {
      data=data+'&birthday_end='+this.val_edad.birthday_end;
    }
    if (this.val_sexo.id) {
      data=data+'&genre='+this.val_sexo.id;
    }
    if (this.val_pierna) {
      data=data+'&player_foot='+this.val_pierna;
    }
    if (this.val_posicion.id) {
      data=data+'&player_position='+this.val_posicion.id;
    }
    if (this.val_team.id) {
      data=data+'&player_club='+this.val_team.id;
    }
    if (this.val_countrys.id) {
      data=data+'&country='+this.val_countrys.name;
    }
    if (this.val_states.id) {
      data=data+'&state='+this.val_states.id;
    }
    if (this.val_provinces.id) {
      data=data+'&province='+this.val_provinces.id;
    }
    if (this.val_divisiones.id) {
      data=data+'&divisions='+this.val_divisiones.name;
    }
    console.log(data);
    let self=this;
    this.p.home_filter(data).subscribe({
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
        self.toast.showError(err.error.err)
      }
    })
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
    let user:any;
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id==id_post) {
        user=posts[i].user_data
      }
      
    }
    console.log(user)
    this.router.navigate(['/video/'+id_post, {post: JSON.stringify(posts),user: JSON.stringify(user)}]);
  }

}

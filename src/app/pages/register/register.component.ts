import { Component, OnInit } from '@angular/core';
import { IdentityService } from 'src/app/services/identity.service';
import { RegisterModel } from './models/register.model';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public imagen:any="assets/img/manager/Combined-Shape.svg";
  public model:RegisterModel= new RegisterModel();
  public formData = new FormData();

  public countrys:any=[];
  public states:any=[];
  public provinces:any=[];

  public s_countrys='';
  public s_states='';
  public s_provinces='';

  public ecountrys=false;
  public estates=false;
  public eprovinces=false;
  
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

  constructor(private identityService: IdentityService, private router: Router, private t: ToastService, private p: PostService) { }

  ngOnInit() {
    let self=this;
    this.p.country().subscribe({
      next(data){
        //console.log(data);
        //this.countrys=data;
        self.countrys.push({
          "id":1,
          "code": "ES",
          "dial_code": "+34",
          "name_en": "España",
          "name_es": "España",
        })
        self.get_countrys(1);
      },error(err){
        console.log(err);
      }
    })
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

  get_countrys(id){
    this.selec_countrys(1,"España");
    this.model.country="España";
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


  get_provinces(id){
    for (let i = 0; i < this.provinces.length; i++) {
      if (this.provinces[i]==id) {
        this.selec_provinces(id,id);
        this.model.province=id;
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


  onFileChange(event){
    console.log(event);
    if(event[0]){
      let files = event[0]; 
      var file:File = files; 
      console.log(files);
      this.formData.append("picture", file, file.name);
    }else if(event.target.files){
      let files = event.target.files[0]; 
      console.log(files);
      var file:File = files; 
      this.formData.append("picture", file, file.name);
    }
    
    console.log(URL.createObjectURL(file));

    var myReader:FileReader = new FileReader();
    let self =this;
    myReader.onloadend = function(e){
     
      console.log(myReader.result);
      self.imagen=myReader.result;
    
    }

    myReader.readAsDataURL(file);
 }

 register(){
  console.log(this.model)
  if (this.model.password!=this.model.rpassword) {
    //alert("Las contrasenas no coinciden");
    this.t.showWarning("Las contrasenas no coinciden");
  }

  this.formData.append("email", this.model.email);
  this.formData.append("password", this.model.password);
  this.formData.append("user_type", this.model.user_type);
  this.formData.append("country", this.model.country);
  this.formData.append("state", this.model.state);
  this.formData.append("province", this.model.province);
  this.formData.append("phone", this.model.phone);
  this.formData.append("name", this.model.name);
  this.formData.append("cif", this.model.cif);
  console.log(this.formData);

  let self = this;
  this.identityService.signup(this.formData).subscribe({
    next(data){
      console.log(data);
      self.t.showSuccess('Registrado con éxito');
      self.t.showInfo('Revisa tu correo y introduce el codigo de activación');
      self.router.navigate(['/activar']);
    },error(err){
      console.log(err);
      self.t.showError(err.error.err);
    }
  })
 }
}

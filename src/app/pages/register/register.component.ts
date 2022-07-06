import { Component, OnInit } from '@angular/core';
import { IdentityService } from 'src/app/services/identity.service';
import { RegisterModel } from './models/register.model';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public imagen:any="assets/img/manager/Combined-Shape.svg";
  public model:RegisterModel= new RegisterModel();
  public formData = new FormData();
  constructor(private identityService: IdentityService, private router: Router, private t: ToastService) { }

  ngOnInit() {
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

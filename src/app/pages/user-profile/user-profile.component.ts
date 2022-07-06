import { Component, OnInit } from '@angular/core';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { UserModel } from 'src/app/models/user';
import { RegisterModel } from '../register/models/register.model';
import { IdentityService } from 'src/app/services/identity.service';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public user: UserModel;
  public imagen="assets/img/theme/team-4-800x800.jpg";
  public model:RegisterModel= new RegisterModel();
  public formData = new FormData();

  constructor(private uss: UserStorageService, private identityService: IdentityService, private t: ToastService) { }

  ngOnInit() {
    this.user = this.uss.user;
    if (this.user.logo==null) {
      this.imagen="assets/img/manager/avatar_user.png";
    }else{
      this.imagen="https://api.ronnie.es/uploads/club/"+this.user.id+"/profile/"+this.user.logo;
    }
    
    console.log(this.user);
  }

  editar(){
    this.formData.append("email", this.user.email);
    this.formData.append("user_type", this.user.user_type);
    this.formData.append("country", this.user.country);
    this.formData.append("state", this.user.state);
    this.formData.append("province", this.user.province);
    this.formData.append("phone", this.user.phone);
    this.formData.append("name", this.user.name);
    this.formData.append("cif", this.user.cif);
    console.log(this.formData);
    
    let self:any = this;
    this.identityService.edit(this.formData).subscribe({
      next(data){
        console.log(data);
        self.t.showSuccess('Editado con éxito');
        console.log(self.user)
        self.uss.set(self.user)
        
      },error(err){
        console.log(err);
        self.t.showError(err.error.err);
      }
    })
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
    let self:any =this;
    myReader.onloadend = function(e){
     
      console.log(myReader.result);
      self.imagen=myReader.result;
    
    }

    myReader.readAsDataURL(file);
 }

}

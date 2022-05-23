import { Component, OnInit } from '@angular/core';
import { IdentityService } from 'src/app/services/identity.service';
import { RegisterModel } from './models/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public model:RegisterModel= new RegisterModel();
  public formData = new FormData();
  constructor(private identityService: IdentityService) { }

  ngOnInit() {
  }

  onFileChange(event){
    console.log(event);
    let files = event.target.files; 
         
    
    //this.model.picture=event.target.files[0];
    console.log(files);
    
    var file:File = event.target.files[0]; 
    this.formData.append("picture", file, file.name);
    this.formData.append("email", "e.stalinrangel@gmail.com");
    this.formData.append("password", "123456789");
    this.formData.append("user_type", "club");
    this.formData.append("country", "spain");
    this.formData.append("state", "Madrid");
    this.formData.append("province", "Madrid");
    this.formData.append("phone", "+34 655 79 88 28");
    this.formData.append("name", "Club Name");
    this.formData.append("cif", "123456789");

    console.log(file);
    console.log(URL.createObjectURL(file));
    var myReader:FileReader = new FileReader();
    let self =this;
    myReader.onloadend = function(e){
     
      console.log(myReader.result);
      self.model.picture=myReader.result;
    
    }

    myReader.readAsBinaryString(file);
 }
 register(){
  console.log(this.formData);
  this.identityService.signup(this.formData).subscribe({
    next(data){
      console.log(data);
    },error(err){
      console.log(err);
    }
  })
}
}

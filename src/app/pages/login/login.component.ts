import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginModel } from './models/login.model';
import { IdentityService } from 'src/app/services/identity.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public model:LoginModel= new LoginModel();

  constructor(private identityService: IdentityService) {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  login(){
    console.log(this.model);
    this.identityService.signin(this.model).subscribe({
      next(data){
        console.log(data);
      },error(err){
        console.log(err);
      }
    })
  }

}

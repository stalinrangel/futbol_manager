import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginModel } from './models/login.model';
import { IdentityService } from 'src/app/services/identity.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public model:LoginModel= new LoginModel();

  constructor(private identityService: IdentityService, private userStorageService:UserStorageService, private router: Router) {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  login(){
    console.log(this.model);
    let self = this;
    this.identityService.signin(this.model).subscribe({
      next(data){
        //console.log(data);
        self.userStorageService.set(data);
        self.router.navigate(['/dashboard']);
      },error(err){
        console.log(err);
        if(err.error.err=='Inactive club'){
          self.router.navigate(['/activar']);
        }
      }
    })
  }

}

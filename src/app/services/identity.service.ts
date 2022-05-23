import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../pages/login/models/login.model';
import { Observable } from 'rxjs';
import { RegisterModel } from '../pages/register/models/register.model';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  constructor(private http:HttpClient) { }
  
  signin(model: LoginModel): Observable<any> {
    return this.http.post('https://api.ronnie.es/v1/auth/signin', model)
  }

  signup(model: any): Observable<any> {
    return this.http.post('https://api.ronnie.es/v1/auth/signup', model)
  }
}

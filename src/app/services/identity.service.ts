import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../pages/login/models/login.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  public e=environment;

  constructor(private http:HttpClient) { }
  

  signin(model: LoginModel): Observable<any> {
    return this.http.post(this.e.apiUrl+'/auth/signin', model)
  }

  signup(model: any): Observable<any> {
    return this.http.post(this.e.apiUrl+'/auth/signup', model)
  }

  edit(model: any): Observable<any> {
    return this.http.patch(this.e.apiUrl+'/profile', model)
  }

  activate(token: any): Observable<any> {
    var send = {
      "user_type": "club",
      "token": token
    }
    return this.http.post(this.e.apiUrl+'/auth/activate', send)
  }

  refresh(token: any): Observable<any> {
    console.log(token)
    var send = {
      "user_type": "club",
      "token": token
    }
    return this.http.get(this.e.apiUrl+'/auth/token?user_type=club&token='+token)
  }
}

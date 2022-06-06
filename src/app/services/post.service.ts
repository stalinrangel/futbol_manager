import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserStorageService } from './user-storage.service';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  public e=environment;
  constructor(private http:HttpClient, private uss:UserStorageService) { }

  private user= this.uss.user;
  home(): Observable<any> {
      var limit=10;
      var timestamp="2022-04-06 22:26:28";
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer '+this.user.token);
      //return this.http.get(this.e.apiUrl+'/profile/feed?limit='+limit+'&timestamp='+timestamp,{headers: headers})
      return this.http.get(this.e.apiUrl+'/posts/recents?limit='+limit,{headers: headers})
  }

  seguidores(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+this.user.token);

    return this.http.get(this.e.apiUrl+'/profile/user/1/followings??limit='+10,{headers: headers})
  }

  seguir(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+this.user.token);
    let data = {
      'user_id': this.user.id,
      'user_type': 'club'
    };
    return this.http.post(this.e.apiUrl+'/profile/follow',data,{headers: headers})
  }

  user_post(id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+this.user.token);
  return this.http.get(this.e.apiUrl+'/posts/user/'+id,{headers: headers})
  }

  user_info(id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+this.user.token);
  return this.http.get(this.e.apiUrl+'/profile/'+id+'/user',{headers: headers})
  }
}

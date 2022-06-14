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
      var limit=50;
      var timestamp=new Date();
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer '+this.user.token);
      //return this.http.get(this.e.apiUrl+'/profile/feed?limit='+limit+'&timestamp='+timestamp,{headers: headers})
      //return this.http.get(this.e.apiUrl+'/posts/recents?limit='+limit,{headers: headers})
      return this.http.get(this.e.apiUrl+'/posts/recents?limit='+limit)
  }

  scooting(): Observable<any> {
    var limit=50;
    var timestamp=new Date(); 
    return this.http.get(this.e.apiUrl+'/posts/private?limit='+limit)
  }

  seguidores(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+this.user.token);

    //return this.http.get(this.e.apiUrl+'/profile/club/'+this.user.id+'/followings??limit='+10,{headers: headers})
    return this.http.get(this.e.apiUrl+'/profile/club/'+this.user.id+'/followings??limit='+10)
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
  return this.http.get(this.e.apiUrl+'/profile/user/'+id+'/posts',{headers: headers})
  }

  user_info(id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+this.user.token);
  return this.http.get(this.e.apiUrl+'/profile/user/'+id,{headers: headers})
  }

  send_post(data): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+this.user.token);
    return this.http.post(this.e.apiUrl+'/posts/private',data,{headers: headers})
  }

}

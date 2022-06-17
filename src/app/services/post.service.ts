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
      return this.http.get(this.e.apiUrl+'/posts/recents/home?limit='+limit)
  }

  home_filter(data): Observable<any> {
    var limit=50;
    return this.http.get(this.e.apiUrl+'/posts/recents/home?limit='+limit+data)
    //https://api.ronnie.es/v1/posts/recents/home?player_height_start=1.80&player_height_end=1.90&birthday_start=1988-01-02&birthday_end=1989-01-02
  }

  positions(): Observable<any> {
    return this.http.get(this.e.apiUrl+'/position?')
  }

  scooting(): Observable<any> {
    var limit=50; 
    var timestamp=new Date(); 
    return this.http.get(this.e.apiUrl+'/posts/recents/private?limit='+limit)
  }
  scooting_filter(data): Observable<any> {
    var limit=50; 
    var timestamp=new Date(); 
    return this.http.get(this.e.apiUrl+'/posts/recents/private?limit='+limit+data)
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

  search(filter): Observable<any> {
  return this.http.get(this.e.apiUrl+'/profile/search/user?'+filter)
  }

  follow(id): Observable<any> {
    let data = {
      'user_id': id,
      'user_type': 'user'
    };
    return this.http.post(this.e.apiUrl+'/profile/follow',data)
  }

  //https://api.ronnie.es/v1/posts/recents/home?player_height_start=1.80&player_height_end=1.90&birthday_start=1988-01-02&birthday_end=1989-01-02

  //https://api.ronnie.es/v1/auth/token?user_type=club&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImUucmFuZ2VsZEBob3RtYWlsLmNvbSIsInJvbGUiOiJjbHViIiwiaWF0IjoxNjU1NDA3NjQyLCJleHAiOjE2NTU0MDkwODJ9.VqVGrZ3f2wenXR2gB6l_acuTafqLFadzee5BMT5qnJo
  //https://api.ronnie.es/v1/posts/recents/private?player_height_start=1.80&player_height_end=1.90&birthday_start=1988-01-02&birthday_end=1989-01-02

}

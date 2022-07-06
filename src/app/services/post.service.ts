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
      return this.http.get(this.e.apiUrl+'/post/recents/home?limit='+limit)
  }

  home_filter(data): Observable<any> {
    var limit=50;
    return this.http.get(this.e.apiUrl+'/post/recents/home?limit='+limit+data)
    //https://api.ronnie.es/v1/posts/recents/home?player_height_start=1.80&player_height_end=1.90&birthday_start=1988-01-02&birthday_end=1989-01-02
  }

  positions(): Observable<any> {
    return this.http.get(this.e.apiUrl+'/position?')
  }

  scooting(): Observable<any> {
    var limit=50; 
    var timestamp=new Date(); 
    return this.http.get(this.e.apiUrl+'/post/recents/private?limit='+limit)
  }
  scooting_filter(data): Observable<any> {
    var limit=50; 
    var timestamp=new Date(); 
    return this.http.get(this.e.apiUrl+'/post/recents/private?limit='+limit+data)
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
    return this.http.post(this.e.apiUrl+'/post/private',data,{headers: headers})
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

  clubs(): Observable<any> {
    return this.http.get(this.e.apiUrl+'/profile/search/club?')
  }

  country(): Observable<any> {
    return this.http.get(this.e.apiUrl+'/country')
  }

  state(id): Observable<any> {
    return this.http.get(this.e.apiUrl+'/country/ES')
  }

  province(id): Observable<any> {
    return this.http.get(this.e.apiUrl+'/country/ES/'+id)
  }

  divisions(): Observable<any> {
    return this.http.get(this.e.apiUrl+'/divisions?country=ES')
  }
  
  categories(): Observable<any> {
    return this.http.get(this.e.apiUrl+'/categories?country=ES')
  }

  section(): Observable<any> {
    return this.http.get(this.e.apiUrl+'/club/section')
  }

  section_id(): Observable<any> {
    return this.http.get(this.e.apiUrl+'/club/section/1')
  }

  create_section(data): Observable<any> {
    return this.http.post(this.e.apiUrl+'/club/section',data)
  }

  club_players(): Observable<any> {
    return this.http.get(this.e.apiUrl+'/club/players')
  }
  club_coach(): Observable<any> {
    return this.http.get(this.e.apiUrl+'/club/players?type=trainer&club='+this.uss.user.id)
  }
  
  trainers(): Observable<any> {
    //return this.http.get(this.e.apiUrl+'/trainer/club/'+this.uss.user.id)
    return this.http.get(this.e.apiUrl+'/trainer')
  }

  add_club_players(): Observable<any> {
    let data={
      "category": 1,
      "section": 1,
      "division": 1,
      "user_type": "user",
      "user_id": 16,
      "firstname": "cris",
      "lastname": "rrr"
    }
    return this.http.post(this.e.apiUrl+'/club/players',data)
  }

  notifications(): Observable<any> {
    return this.http.get(this.e.apiUrl+'/profile/notifications')
  }
  
}

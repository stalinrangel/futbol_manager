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
      var timestamp="2022-05-24 22:26:28";
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer '+this.user.token);
    return this.http.get(this.e.apiUrl+'/profile/feed?limit='+limit+'&timestamp='+timestamp,{headers: headers})
  }
}

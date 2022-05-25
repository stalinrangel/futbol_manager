import { Injectable } from '@angular/core';
import { UserModel } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  private key: string="ng-auth";

  constructor() { }

  get user(): UserModel {
    let user = localStorage.getItem(this.key);

    if (user) {
      let objUser= JSON.parse(user);
      return objUser as UserModel;
    }
    return null;
  }

  get isAuth():boolean {
    let user = localStorage.getItem(this.key);
    return user !== null;
  }

  set(object):void{
    localStorage.setItem(
      this.key,
      JSON.stringify(object)
    );
  }

  destroy(): void{
    localStorage.removeItem(this.key);
  }
}

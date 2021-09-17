import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

const USER_TOKEN = 'auth-user';
const USER_NAME = 'username';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }


  public getToken(): string {
    return sessionStorage.getItem(USER_TOKEN);
  }
  public getUser(): string {
    return sessionStorage.getItem(USER_NAME);
  }

  public saveToken(token): void {
    window.sessionStorage.removeItem(USER_TOKEN);
    window.sessionStorage.setItem(USER_TOKEN, token);
  }
  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_NAME);
    window.sessionStorage.setItem(USER_NAME, user);
  }


}

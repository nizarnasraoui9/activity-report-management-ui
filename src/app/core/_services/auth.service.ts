import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const AUTH_API = 'http://localhost:8080';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUserSubject: BehaviorSubject<any | null >;
  public currentUser: Observable<any | null>;
  constructor(private http: HttpClient) { 
        const user = localStorage.getItem('currentUser'); 
        this.currentUserSubject = new BehaviorSubject<any | null>(user ? JSON.parse(user):null);
        this.currentUser = this.currentUserSubject.asObservable();
  }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + '/authenticate', {
      username: credentials.username,
      password: credentials.password
    }) .pipe(map(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
  }));;
  }

  public get currentUserValue(): any | null{
    return this.currentUserSubject.value;
}

  register(user): Observable<any> {
    return this.http.post('http://localhost:8080/register', {
      "username": user.username,
      "password": user.password,
      "firstName": user.firstName,
      "lastName": user.lastName,
      "email": user.email,
      "enabled": true,
      "accountNonExpired": true,
      "accountNonLocked": true
      
    });
  }

  
}

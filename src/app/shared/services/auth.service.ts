import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import auth from "../../../../node_modules/firebase"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {    

  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(sessionStorage.getItem('username'));
    return (user !== null) ? true : false;
  }

}

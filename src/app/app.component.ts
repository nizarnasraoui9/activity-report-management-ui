import { Component, OnInit } from '@angular/core';
import { TokenStorageService} from './core/_services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;





  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }

  OnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      //this.roles = user.roles;

     // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
     // this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      //this.username = user.username;

      //this.router.navigate(['/cra'], { queryParams: {} });
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopupService } from '../_services/popup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService,
     private tokenStorage: TokenStorageService,
      private router: Router,
      private dialog:MatDialog,
      private popup:PopupService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data['jwttoken']);
        this.tokenStorage.saveUser(this.form.username);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        //this.reloadPage();
        this.router.navigate(['/main/cra'], { queryParams: {} });
        this.dialog.closeAll();
        this.popup.success("Connexion réussi");

      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.popup.error(this.errorMessage);
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service'

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent implements OnInit {

  constructor(private router:Router,private dialog:MatDialog,private tokenStorageService: TokenStorageService, private authService : AuthService) { }

  ngOnInit(): void {
  }
  signOut(){
    this.router.navigate(['/login'], { queryParams: {} });
    this.tokenStorageService.signOut();
    this.dialog.closeAll();
    localStorage.removeItem('currentUser');
    this.authService.currentUserSubject.next(null);
  }
  closeModal(){
    this.dialog.closeAll();
  }

}

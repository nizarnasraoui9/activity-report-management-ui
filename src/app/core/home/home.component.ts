import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  content: string;

  constructor(private userService: UserService,private dialog:MatDialog,private router:Router) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
  openLogin(){
    this.dialog.open(LoginComponent);
  }
  openRegister(){
    this.dialog.open(RegisterComponent);
  }
  openMain(){
    this.router.navigate(['/main/cra'], { queryParams: {} });
  }

}

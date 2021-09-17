import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from 'src/app/shared/services/account.service';
import { textChangeRangeIsUnchanged } from 'typescript';
import { SignOutComponent } from '../../core/sign-out/sign-out.component';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  showFiller = true;
  method: string;
  admin : boolean ;
  username : String
  constructor(private dialog: MatDialog ,private accountService : AccountService) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    console.log(this.username);
    console.log(navigator.userAgent);
    const device:string=navigator.userAgent;
    if(device.includes("Android")) 
    this.method='push';
    else this.method='side';
    this.accountService.getPersonnalInformationsByUserName(this.username).subscribe(
      (user)=>{
            if(user.roles[0].name === "ROLE_ADMIN") this.admin = true 
            else this.admin = false
          }
    )
  }
  openModal(){
    this.dialog.open(SignOutComponent,{
      height: '150px',
      width: '300px',
    });
  }
  

}

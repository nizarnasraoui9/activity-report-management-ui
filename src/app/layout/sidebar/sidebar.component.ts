import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignOutComponent } from '../../core/sign-out/sign-out.component';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  showFiller = true;
  method: string;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(navigator.userAgent);
    const device:string=navigator.userAgent;
    if(device.includes("Android")) 
    this.method='push';
    else this.method='side';
  }
  openModal(){
    this.dialog.open(SignOutComponent,{
      height: '150px',
      width: '300px',
    });
  }
  

}

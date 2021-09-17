import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddCraComponent } from '../add-cra/add-cra.component';

@Component({
  selector: 'app-add-cra-button',
  templateUrl: './add-cra-button.component.html',
  styleUrls: ['./add-cra-button.component.css']
})
export class AddCraButtonComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }
  openModal(){
    this.dialog.open(AddCraComponent,{
      height: '450px',
      width: '520px',
    });
  }
  
}

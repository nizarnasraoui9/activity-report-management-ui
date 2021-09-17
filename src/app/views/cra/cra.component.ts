import { Component, OnInit } from '@angular/core';
import { CraService } from '../../shared/services/cra.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cra',
  templateUrl: './cra.component.html',
  styleUrls: ['./cra.component.css']
})
export class CraComponent implements OnInit {
  cras:any[];
  craSelected:boolean=false;
  selectedCra:any;
  routerLink:String;
  loadComponent:Boolean;
  constructor(private craService:CraService,private router:Router) { }
  ngOnInit(): void {
    this.loadComponent=false;

    this.craService.getAllCras().subscribe((response)=>{
      console.log(response);
      this.cras=response;
      
    });
  }
  getCra(){
    this.craService.getCra(1).subscribe((response)=>{
      console.log(response)
    })
  }
  showCraDetails(cra){
    this.router.navigate(['main/cra/'+cra.id], { queryParams: {} });
  }


}

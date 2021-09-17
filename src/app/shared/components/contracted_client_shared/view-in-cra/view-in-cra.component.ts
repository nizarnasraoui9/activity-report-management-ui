import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-in-cra',
  templateUrl: './view-in-cra.component.html',
  styleUrls: ['./view-in-cra.component.css']
})
export class ViewInCraComponent implements OnInit {
  @Input() selectedCra;
  @Input() type:string;
  constructor() { }
  
  name:String;
  siret:String;
  ngOnInit(): void {
    if(this.type=="client"){
      this.name=this.selectedCra.client.name;
      this.siret=this.selectedCra.client.siret;
    }
    else {
      this.name=this.selectedCra.contracted.name;
      this.siret=this.selectedCra.contracted.siret;
    } 
  }
  //   switch(this.type){
  //     case("client"): {
  //       this.name=this.selectedCra.client.name;
  //       this.siret=this.selectedCra.client.siret;
  //     }
  //     case("contracted"):{
  //       this.name=this.selectedCra.contracted.name;
  //       this.siret=this.selectedCra.contracted.siret;
  //     }
  //   }

  // }

}

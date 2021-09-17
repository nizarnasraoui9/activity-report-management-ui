import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cra-card',
  templateUrl: './cra-card.component.html',
  styleUrls: ['./cra-card.component.css']
})
export class CraCardComponent implements OnInit {
  @Input() cra:any;
  date:string;
  contractedName:string;
  clientName:string;
  daysSum:number;
  progressBarValue:number;
  id:number;
  months:string[];
  loadComponent:Boolean;

  constructor() { }

  ngOnInit(): void {
    
    this.loadComponent=false;
    this.months=["Janvier","Fevier","Mars","Avril","Mai","Juin","Juillet","Out","Septembre","Octobre","Novembre","Decembre"]
  
    this.contractedName=this.cra.contracted.name;
    this.clientName=this.cra.client.name;
    this.date=this.months[this.cra.month-1]+" "+this.cra.year;
   
    this.daysSum=0;
    this.cra.workDays.forEach(element => {
      if(element.workedTime=="full") this.daysSum++;
      if(element.workedTime=="half") this.daysSum+=0.5;
    });
    this.progressBarValue=(this.daysSum/30)*100;
    this.loadComponent=true; 
    
  }

  
  

}

import { Component, OnInit } from '@angular/core';
import { CraService } from '../../../services/cra.service';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from '../../../services/client.service';
import { ContractedService } from '../../../services/contracted.service';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-add-cra',
  templateUrl: './add-cra.component.html',
  styleUrls: ['./add-cra.component.css']
})
export class AddCraComponent implements OnInit {
  clientList:any[];
  contractedList:any[];
  selectedYear:string;
  selectedMonth:string;
  cra: any;
  workDays : Array<{dayOfMonth : number , workedTime : String , workedSeconds : number }> =  [];
  month:any;
  contracted:any;
  client:any;
  selectDate:boolean=false;
  contractedSelected:boolean=false;
  ClientSelected:boolean=false;
  createCra:boolean=false;
  year=(new Date()).getFullYear();
  constructor(private craService:CraService,private modal:MatDialog,private clientService:ClientService,private contractedService:ContractedService) { }
  ngOnInit(): void {
    this.selectedYear=String((new Date()).getFullYear());
    this.selectedMonth="1";
    this.clientService.getAllClients().subscribe((response)=>{
      this.clientList=response;
    });
    this.contractedService.getAllContracteds().subscribe((response)=>{
      this.contractedList=response;
    });
    console.log(this.clientList);
    this.selectDate=true;
  }
  selectMonth(month){
    this.month=month;
    this.openSelectContracted();
  }
  selectContracted(contracted:String){
    this.contracted=contracted;
    this.openSelectClient();
  }
  selectClient(client:String){
    this.client=client;
    this.openCreateCra();

  }


  openSelectContracted(){
    this.selectDate=false;
    this.contractedSelected=true;
  }
  openSelectClient(){
    this.contractedSelected=false;
    this.ClientSelected=true;
  }
  openCreateCra(){
    this.ClientSelected=false;
    this.createCra=true;
  }
  onSubmit(){
    const numberOfDays = new Date(Number(this.selectedYear), Number(this.selectedMonth), 0).getDate();
    for (let i = 0; i < numberOfDays; i++) {
        this.workDays.push({dayOfMonth : i+1, workedTime : "none", workedSeconds :0});
    }

    this.modal.closeAll();
    this.cra={
      "type": "day",
      "year": this.selectedYear,
      "month": this.selectedMonth,
      "note": "",
      "workDays": this.workDays,

      "client": {
          "id": this.client.id
          // "siret": this.client.siret,
          // "uniqueIdentifier": this.client.uniqueIdentifier,
          // "country": this.client.country,
          // "streetNumber": this.client.streetNumber,
          // "repetition": this.client.repetition,
          // "streetType": this.client.streetType,
          // "streetName": this.client.streetName,
          // "postalCode": this.client.postalCode,
          // "city": this.client.city,
          // "contact": this.client.contact
      },
      "contracted": {
        "id": this.contracted.id
        // "siret": this.contracted.siret,
        // "uniqueIdentifier": this.contracted.uniqueIdentifier,
        // "country": this.contracted.country,
        // "streetNumber": this.contracted.streetNumber,
        // "repetition": this.contracted.repetition,
        // "streetType": this.contracted.streetType,
        // "streetName": this.contracted.streetName,
        // "postalCode": this.contracted.postalCode,
        // "city": this.contracted.city,
        // "contact": this.contracted.contact
      },
      "local": null
  }


    this.craService.createCra(this.cra).subscribe(()=>{
        window.location.reload();

    })
  }

}

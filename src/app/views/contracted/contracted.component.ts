import { Component, OnInit, ViewChild } from '@angular/core';
import { AddContractedCardComponent } from 'src/app/shared/components/contracted/add-contracted-card/add-contracted-card.component';
import { ContractedService } from '../../shared/services/contracted.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contracted',
  templateUrl: './contracted.component.html',
  styleUrls: ['./contracted.component.css']
})
export class ContractedComponent implements OnInit {
  
  contractedList:any[];
  constructor(private contractedService:ContractedService,
    private Router : Router) { }

  ngOnInit(): void {
    this.contractedService.getAllContracteds().subscribe((response)=>{
      this.contractedList=response;
    });

  }
  addContracted(){
    alert("Préstataire ajouté avec succès");
  }

  showContractedDetails(contracted){
    this.Router.navigate(['main/contracted/'+contracted.id], { queryParams: {} });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../shared/services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clientList:any[];
  constructor(private clientService:ClientService, private Router : Router) { }

  ngOnInit(): void {
    this.clientService.getAllClients().subscribe((response)=>{
      this.clientList=response;
    });

  }
  addClient(){
    alert("Préstataire ajouté avec succès");
  }

  showClientDetails(client){
    this.Router.navigate(['main/client/'+client.id], { queryParams: {} });
  }


}

import { Component,Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientService } from '../../../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.css']
})
export class ClientCardComponent implements OnInit {
  @Input() client;
  constructor(private http:HttpClient,private clientService:ClientService,public router : Router) { }
  name:String;
  siret:String;
  id:number
  ngOnInit(): void {
      this.name=this.client.name;
      this.siret=this.client.siret;
      this.id = this.client.id;
    }
 
  deleteClient():void{
    this.http.delete("http://localhost:8080/clients/"+this.id).subscribe(
      data =>  console.log(data)     
    )
    window.location.reload();
  }
  }

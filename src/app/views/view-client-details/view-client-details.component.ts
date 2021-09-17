import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/shared/services/client.service';

@Component({
  selector: 'app-view-client-details',
  templateUrl: './view-client-details.component.html',
  styleUrls: ['./view-client-details.component.css']
})
export class ViewClientDetailsComponent implements OnInit {

  @Input() selectedClient;
  id : number
  client : any
  form = new FormGroup({
    id : new FormControl(),
    name: new FormControl(),
    siret: new FormControl(),
    repetition: new FormControl(),
    city: new FormControl(),
    streetName: new FormControl(),
    streetNumber: new FormControl(),
    postalCode: new FormControl(),
    streetType: new FormControl(),
  }
  )

  constructor(private clientService:ClientService,private route: ActivatedRoute, private http:HttpClient, private Router : Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id=params.id;
    });
    this.clientService.getClient(this.id).subscribe((response)=>{
      this.client=response;

      this.form.setValue({
        id :this.client.id ,
        name : this.client.name,
        siret: this.client.siret,
        repetition: this.client.repetition,
        city: this.client.city,
        streetName: this.client.streetName,
        streetNumber: this.client.streetNumber,
        postalCode: this.client.postalCode,
        streetType : this.client.streetType,
      })
    });
  }

  onSubmit(){
    return this.http.put("http://localhost:8080/clients/"+this.client.id,
  {
      "id" : this.form.value.id ,
      "name" : this.form.value.name,
      "siret" : this.form.value.siret,
      "streetNumber" : this.form.value.streetNumber,
      "repetition" : this.form.value.repetition,
      "streetType" : this.form.value.streetType,
      "postalCode" : this.form.value.postalCode,
      "streetName" : this.form.value.streetName,
      "city" : this.form.value.city
  }).subscribe(window.location.reload)
}
  }



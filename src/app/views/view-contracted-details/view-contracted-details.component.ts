import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, NgModule } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractedService } from 'src/app/shared/services/contracted.service';


@Component({
  selector: 'app-view-contracted-details',
  templateUrl: './view-contracted-details.component.html',
  styleUrls: ['./view-contracted-details.component.css']
})
export class ViewContractedDetailsComponent implements OnInit {
  @Input() selectedContracted;
  id : number
  contracted : any
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
  constructor(private contractedService:ContractedService,private route: ActivatedRoute, private http:HttpClient, private Router : Router,) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id=params.id;
    });
    this.contractedService.getContracted(this.id).subscribe((response)=>{
      this.contracted=response;

      this.form.setValue({
        id :this.contracted.id ,
        name : this.contracted.name,
        siret: this.contracted.siret,
        repetition: this.contracted.repetition,
        city: this.contracted.city,
        streetName: this.contracted.streetName,
        streetNumber: this.contracted.streetNumber,
        postalCode: this.contracted.postalCode,
        streetType : this.contracted.streetType,
      })
      console.log(this.form.value.id)
    });
  }

  onSubmit(){
    return this.http.put("http://localhost:8080/contracteds/"+this.contracted.id,
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

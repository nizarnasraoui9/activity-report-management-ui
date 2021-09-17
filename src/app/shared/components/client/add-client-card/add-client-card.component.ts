import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { Observable,of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddClientModalComponent } from '../add-client-modal/add-client-modal.component';
import { HttpClient } from '@angular/common/http';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-add-client-card',
  templateUrl: './add-client-card.component.html',
  styleUrls: ['./add-client-card.component.css']
})
export class AddClientCardComponent implements OnInit {

  constructor(private dialog:MatDialog,private http:HttpClient,private clientService:ClientService) { }

  myControl = new FormControl();
  options: string[] = [];
  clients:any[]=[];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.myControl.valueChanges.subscribe((value)=>{
      const data = this.http.get('https://entreprise.data.gouv.fr/api/sirene/v1/full_text/'+value);
      data.subscribe((response)=>{
        console.log(response);
        this.updateOptions(response).subscribe(()=>{
          data.subscribe(()=>{
            this.filteredOptions = this.myControl.valueChanges.pipe(
              startWith(''),
              map(value => this._filter(value))
            );
        });

      });
    });
    });
  }



  updateOptions(response:any):Observable<any>{
    /*
    parsing the response and deleting the array this.options then updating it based on the json response
    */
   this.clients=[];
   this.clients=response.etablissement;
   console.log(this.clients);
   this.options=[];
   this.clients.forEach(element => {
     this.options.push(String(element.l1_normalisee +" "+element.geo_adresse));
     
   });
    return of("updated");
  }
    
  
  selectOption(option){
    console.log("option");
    console.log(option);
    const client={
      "name": option.l1_normalisee,
      "siret": option.siret,
      "uniqueIdentifier": "",
      "country": "fr",
      "streetNumber": option.numero_voie,
      "repetition": option.indice_repetition,
      "streetType": option.type_voie,
      "streetName": option.libelle_voie,
      "postalCode": option.code_postal,
      "city": option.libelle_commune,
      "contact": ""
  };
 
  this.clientService.addClient(client).subscribe((response)=>{
    window.location.reload();
  });

  }




  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  openModal(){
    this.dialog.open(AddClientModalComponent, {
      height: 'auto',
      width: '500px',
    });
  }
}

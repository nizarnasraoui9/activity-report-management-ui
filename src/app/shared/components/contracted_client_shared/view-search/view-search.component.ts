import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-view-search',
  templateUrl: './view-search.component.html',
  styleUrls: ['./view-search.component.css']
})
export class ViewSearchComponent implements OnInit {
  @Input() contracted;
  name:String;
  address:String;
  field:String;
  constructor() { }

  ngOnInit(): void {
    this.name=this.contracted.l1_normalisee;
    this.address=this.contracted.geo_adresse;
    this.field=this.contracted.libelle_activite_principale_entreprise;
  }
  

}

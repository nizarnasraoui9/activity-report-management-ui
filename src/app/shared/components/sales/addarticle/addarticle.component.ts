import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {Router} from '@angular/router';
import { ArticleService } from '../../../services/article.service';
import { ClientService } from '../../../services/client.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-addarticle',
  templateUrl: './addarticle.component.html',
  styleUrls: ['./addarticle.component.css']
})
export class AddarticleComponent implements OnInit {
  tva:any;
  options: string[] = [];
  id : number
  article : any
  selectedTva:number
  clients:any=[];
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  form = new FormGroup({
    id : new FormControl(),
    denomination: new FormControl(),
    type: new FormControl(),
    unitPrice:new FormControl(),
    tva: new FormControl(),
    unit: new FormControl(),
    reference: new FormControl(),
    comment: new FormControl(),
    clientName: new FormControl()

  }
  )

  constructor(private router:Router,private articleService:ArticleService, private clientService:ClientService) { }

  ngOnInit(): void {
    this.articleService.getAllTva().subscribe((res)=>{
        this.tva=res;
    });

    this.clientService.getAllClients().subscribe((res)=>{
      this.clients=res;
      res.forEach(element => {
        this.options.push(element.name);
        this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      });
      
      
    });
    
    
   
  }

  onSubmit(){
    let ar={
      "denomination" : this.form.value.denomination,
      "type" : this.form.value.type,
      "unit" : this.form.value.unit,
      "reference" : this.form.value.reference,
      "comment" : this.form.value.comment,
      "unitPrice": this.form.value.unitPrice,
      "tva": this.form.value.tva,
      "clientName": this.myControl.value
  };
  this.articleService.addArticle(ar).subscribe(()=>{
    this.router.navigate(['/main/sales/article'], { queryParams: {} });

   });
};
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

   
  

}
 
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {Router} from '@angular/router';
import { ArticleService } from '../../../services/article.service';


@Component({
  selector: 'app-addarticle',
  templateUrl: './addarticle.component.html',
  styleUrls: ['./addarticle.component.css']
})
export class AddarticleComponent implements OnInit {
  tva:any;


  
  id : number
  article : any
  selectedTva:number
  form = new FormGroup({
    id : new FormControl(),
    denomination: new FormControl(),
    type: new FormControl(),
    unitPrice:new FormControl(),
    tva: new FormControl(),
    unit: new FormControl(),
    reference: new FormControl(),
    comment: new FormControl(),

  }
  )

  constructor(private router:Router,private articleService:ArticleService) { }

  ngOnInit(): void {
    this.articleService.getAllTva().subscribe((res)=>{
        this.tva=res;
    })
    
    
   
  }

  onSubmit(){
    let ar={
      "denomination" : this.form.value.denomination,
      "type" : this.form.value.type,
      "unit" : this.form.value.unit,
      "reference" : this.form.value.reference,
      "comment" : this.form.value.comment,
      "unitPrice": this.form.value.unitPrice,
      "tva": this.form.value.tva
  };
  this.articleService.addArticle(ar).subscribe(()=>{
    this.router.navigate(['/main/sales/article'], { queryParams: {} });

   });
}
;

   
  

}
 
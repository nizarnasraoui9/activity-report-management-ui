import { Component, OnInit } from '@angular/core';
import { MAT_DATE_LOCALE} from '@angular/material/core';
import { BillService } from '../../../services/bill.service';
import { Article } from '../../../models/Article';
import { ArticleService } from '../../../services/article.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-addbill',
  templateUrl: './addbill.component.html',
  styleUrls: ['./addbill.component.css'],
  providers:[{provide: MAT_DATE_LOCALE,useValue: 'fr-FR'}]
  
})
export class AddbillComponent implements OnInit {









  cra:any;
  id:number;
  tvaSum:number=0;
  pricesSum:number=0;
  billSum:number=0;
  regulationConditionOptions:String[]=['a','b','c'];
  years:number[]=[2020,2021];
  months:number[]=[1,2,3,4,5,6,7,8,9,10,11,12];
  articles:Article[];
  myControl = new FormControl();
  options: string[] = [];
  selectedArticles:Article[]=[];
  filteredOptions: Observable<string[]>;
  cras:any[]=[];
  billArticles=[];
  billCras=[];

  form=new FormGroup({
    regulationCondition:new FormControl("à la livraison"),
    emissionDate:new FormControl(),
    dueDate:new FormControl(),
    
    
  })
  searchCraForm=new FormGroup({
    month:new FormControl(),
    year:new FormControl()
    
    
  })
  searchArticleForm=new FormGroup({
    name:new FormControl()
  })
  

  constructor(private billService:BillService,private articleService:ArticleService) { }

  ngOnInit(): void {
    this.billService.createEmtyBill().subscribe((res)=>{
      this.id=res.id;
    })
    this.articleService.getAllArticles().subscribe((res)=>{
      this.articles=res;
      res.forEach(element => {
        this.options.push(element.denomination);
        this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      });
      
      
    });

    
    
    

    this.regulationConditionOptions=["à la livraison","b","c"];
    
    
    
    
  }
  addArticleToCra(cra:any,option:string){
    let article=this.articles.find(element=>element.denomination===option);
    this.articles.find(element=>element.denomination===option).cra=cra;
    this.articles.find(element=>element.denomination===option).amount=article.unitPrice+(article.unitPrice/100)*article.tva;
    
    cra.articles.push(article);
    this.selectedArticles.push(article);
    this.updateSum();
    
  }

  viewEmissionDate(){
    /*console.log(this.form.value.emissionDate);
    console.log(this.form.value.dueDate);
    console.log(this.form.value.regulationCondition);
    console.log(this.form.value.articles);
    console.log(this.selectedArticles);
    console.log(this.searchCraForm.value.month);
    console.log(this.searchCraForm.value.year);
    console.log(this.cras);*/
    console.log(this.billCras);
    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  getRegulationCondition(){
    return this.form.value.regulationCondition;
  }
  setRegulationCondition(regulation:string){
    this.form.value.regulationCondition=regulation;
  }
  searchCra(){
    this.cras=[];
    this.billService.getCra(this.searchCraForm.value.year,this.searchCraForm.value.month).subscribe((res)=>{
      this.cras.push(res);
      console.log(this.cras);
    })
    this.selectedArticles=[];
  }

  addArticleToBill(article:any){
    this.billArticles.push(article);
    this.updateSum();
  }

  addCraToBill(cra:any){
    let daysSum=0;
    cra.workDays.forEach(element => {
      if(element.workedTime=="full") daysSum++;
      if(element.workedTime=="half") daysSum+=0.5;
    });
    cra.daysSum=daysSum;
    cra.articles=[];
    this.billCras.push(cra);
    this.cra=cra;
    this.selectedArticles=[];
    
 
  }

  updateSum(){
    console.log("here");
    var tvaSum=0;
    var billSum=0;
    var pricesSum=0;
    for(let i:number=0;i<this.billArticles.length;i++){
      let article:Article=this.billArticles[i];
      tvaSum+=article.tva*article.cra.daysSum;
      console.log(tvaSum);
      pricesSum+=article.unitPrice*article.cra.daysSum;
    }
    /*this.billArticles.forEach((article:Article)=>{
      TvaSum+=article.tva*article.cra.daysSum;
      console.log(TvaSum);
      pricesSum+=article.unitPrice*article.cra.daysSum;

    });*/
    billSum=tvaSum+pricesSum;
    this.tvaSum=tvaSum;
    this.billSum=billSum;
    this.pricesSum=pricesSum;

  }

  saveBill(){
    this.billService.saveBill(this.billCras).subscribe((res)=>{
      console.log(res);
    });
  }






  
  }

  

   


import { Component, OnInit } from '@angular/core';
import { MAT_DATE_LOCALE} from '@angular/material/core';
import { BillService } from '../../../services/bill.service';
import { Article } from '../../../models/Article';
import { ArticleService } from '../../../services/article.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ClientService } from '../../../services/client.service';


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
  clients=[];
  selectedCras=[];

  form=new FormGroup({
    regulationCondition:new FormControl("à la livraison"),
    emissionDate:new FormControl(),
    dueDate:new FormControl(),
    
    
  })
  searchCraForm=new FormGroup({
    month:new FormControl(),
    year:new FormControl(),
    clientName:new FormControl()
    
    
  })
  searchArticleForm=new FormGroup({
    name:new FormControl()
  })
  

  constructor(private billService:BillService,private articleService:ArticleService,private clientService:ClientService) { }

  ngOnInit(): void {
    // this.billService.createEmtyBill().subscribe((res)=>{
    //   this.id=res.id;
    // })
    
    this.clientService.getAllClients().subscribe((res)=>{
      this.articles=res;
      res.forEach(element => {
        this.options.push(element.name);
        this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      });
      
      
    });

    
    
    

    this.regulationConditionOptions=["à la livraison","b","c"];
    
    
    
    
  }
  

  viewEmissionDate(){
    
    
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
    this.billService.getCra(this.searchCraForm.value.year,this.searchCraForm.value.month,this.searchCraForm.value.clientName).subscribe((res)=>{
      let craFinded=res;
      for(let i=0;i<craFinded.length;i++){
        let clientName=craFinded[i].client.name;
        this.articleService.getArticleByClientName(clientName).subscribe((res)=>{
          craFinded[i].article=res;
        })
      }
      this.cras.push(craFinded);
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
    this.selectedCras.push(cra);
    this.updateSum();
    
 
  }

  updateSum(){
    var tvaSum=0;
    var billSum=0;
    var pricesSum=0;
    for(let i:number=0;i<this.selectedCras.length;i++){
      let cra:any=this.selectedCras[i];
      let article:Article=cra.article;
      tvaSum+=article.tva*cra.daysSum;
      pricesSum+=article.unitPrice*cra.daysSum;
    }
    billSum=tvaSum+pricesSum;
    this.tvaSum=tvaSum;
    this.billSum=billSum;
    this.pricesSum=pricesSum;

  }

  saveBill(){
    let articles:any=[];
      for(let i=0;i<this.selectedCras.length;i++){
        this.selectedCras[i].articles=[];
        let article:any=this.selectedCras[i].article;
        this.selectedCras[i].articles=[article];
        delete this.selectedCras[i].article;
        
        // let cra:any=this.selectedCras[i];
        // articles.push(cra.article);
        // clients.push(cra.client);
    }
    console.log(this.selectedCras);
    this.billService.saveBill(this.selectedCras).subscribe((res)=>{
    });
  }






  
  }

  

   


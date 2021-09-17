import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {PATH} from './paths';
import { Observable } from 'rxjs';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http:HttpClient) { }
  getCra(year:number,month:number):Observable<any>{
    return this.http.get(PATH+"cras/{year}/{month}?year="+year+"&month="+month);
  }
  createEmtyBill():Observable<any>{
    return this.http.post("http://127.0.0.1:8081/sale-api/bill/add/''/''",[]);
  }
  saveBill(cras):Observable<any>{
    var mycra:any[]=[];
    var articles:any[];
    var client,contracted:any;
    cras.forEach(element => {
      articles=[];
      var currentCra={
        "id": element.id,
        "workDays":element.workDays,
        "client": element.client,
        "contracted": element.contracted
      };
      
      element.articles.forEach(art => {
        client={
          "name": element.client.name,
          "siret": element.client.siret
        };
        contracted={
          "name": element.contracted.name,
          "siret": element.contracted.siret
        };
        var article=
          {
        "denomination":art.denomination,
        "type":art.type,
        "unit":art.unit,
        "reference":art.reference,
        "unitPrice":art.unitPrice,
        "tva": art.tva,
        "comment":art.comment
    };
    articles.push(article);
      });
      element.articles=articles;
      element.client=client;
      element.contracted=contracted;
      mycra.push(element);
       
      
      
      
    
          
    });
    console.log(mycra);

    
  
  return this.http.post("http://127.0.0.1:8081/sale-api/bill/add/'a'/'a'",mycra);
  }


}

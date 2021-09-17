import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { Article } from '../models/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http:HttpClient) { }
  addArticle(article:any){
    return this.http.post("http://localhost:8081/sale-api/article/add",article);
  }
  /*getAllArticles():Observable<any>{
    let allArticles:Article[];
    this.http.get("http://localhost:8081/sale-api/article/all").subscribe((articles:Article[])=>{
      articles.forEach(article => {
        allArticles.push({"id":article.id,"denomination":article.denomination,"comment":article.comment,"tva":article.tva,"unitPrice":article.unitPrice});
        
      });
    })
    
    return of(allArticles);
  }*/
  getAllTva():Observable<any>{
    return this.http.get("http://localhost:8081/sale-api/tva/get/all");
  }
  getAllArticles():Observable<any>{
    return this.http.get("http://localhost:8081/sale-api/article/all");
  }



  

}
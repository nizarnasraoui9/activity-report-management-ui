import {AfterViewInit, Component, ElementRef, OnInit, ViewChild,Input} from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ArticleService } from '../../../services/article.service';
import {Article} from '../../../models/Article';
import { Router } from '@angular/router';




 @Component({
  selector: 'app-view-articles',
  templateUrl: './view-articles.component.html',
  styleUrls: ['./view-articles.component.css']
})
export class ViewArticlesComponent implements OnInit, AfterViewInit {
  @Input() data;
  
  constructor(private articleService:ArticleService,private router:Router) {

  }

    ngOnInit() {
      

      
    
      

    }

    displayedColumns: string[] = ['id', 'denomination', 'comment', 'tva','unitPrice'];
    dataSource: MatTableDataSource<Article>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  

  ngAfterViewInit() {
    let allArticles:Article[];
      this.articleService.getAllArticles().subscribe((articles:Article[])=>{
        this.dataSource = new MatTableDataSource(articles);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openAddClient(){
    this.router.navigate(['main/sales/article/add']);

  }
}




  
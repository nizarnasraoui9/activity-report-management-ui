import {AfterViewInit, Component, ElementRef, OnInit, ViewChild,Input} from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ArticleService } from '../../../services/article.service';
import {Article} from '../../../models/Article';
import { Router } from '@angular/router';
import { ConsultantsService } from 'src/app/shared/services/consultants.service';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-consultants',
  templateUrl: './consultants.component.html',
  styleUrls: ['./consultants.component.css']
})
export class ConsultantsComponent implements OnInit {
  isEnable : boolean
  admin : boolean
  username : String
  constructor(private consultantsServices:ConsultantsService,private router:Router , private accountService : AccountService) { }
    
  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.accountService.getPersonnalInformationsByUserName(this.username).subscribe((account) => {
      if (account.roles[0].name === "ROLE_USER") {
        console.log("hhh")
      this.router.navigate(['/main/cra'])
      }
    })
  }

  displayedColumns: string[] = ['username', 'account','admin'];
  dataSource: MatTableDataSource<Account>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    
    let allAccounts:Account[];
      this.consultantsServices.getAllUsers().subscribe((accounts:Account[])=>{
        this.dataSource = new MatTableDataSource(accounts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(accounts);
      });
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  change(account : any){
  if (account.enabled === true ) this.isEnable = false ;
  else this.isEnable = true
  
  account.enabled = this.isEnable
  console.log(account);
  this.accountService.updatePersonalInformations(account.accountId , account).subscribe((data) => {
    console.log(account);
    window.location.reload
  })


}

changeRole(account : any){
  if (account.roles[0].name === "ROLE_ADMIN" ) {
    account.roles[0].name = "ROLE_USER"
    account.roles[0].roleId = 1

  }
  else {
    account.roles[0].name = "ROLE_ADMIN"
    account.roles[0].roleId = 2
  }

  this.accountService.updatePersonalInformations(account.accountId , account).subscribe((data) => {
    window.location.reload
  })
}

showAccount(account){
  this.router.navigate(['main/account/'], { queryParams: {username : account.username} });
}
}

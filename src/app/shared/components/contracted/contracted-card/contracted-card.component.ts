import { Component, Input,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientService } from '../../../services/client.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SignatureComponent } from '../../signature/signature.component';
import { AccountService } from 'src/app/shared/services/account.service';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ContractedService } from 'src/app/shared/services/contracted.service';


@Component({
  selector: 'app-contracted-card',
  templateUrl: './contracted-card.component.html',
  styleUrls: ['./contracted-card.component.css']
})
export class ContractedCardComponent implements OnInit {
  @Input() contracted;
  constructor(private contractedService : ContractedService , private http:HttpClient,private accountService : AccountService,private clientService:ClientService,public router : Router , private dialog : MatDialog) { }
  id : number ;
  name:String;
  siret:String;
  signature : any;
  ngOnInit(): void {
    this.contractedService.enabledSignatureSubject.next(false);
      this.name=this.contracted.name;
      this.siret=this.contracted.siret;
      this.id=this.contracted.id ;
      this.accountService.getSignature().subscribe((res)=>{
        this.signature = res[0];
        console.log(this.signature);
      })
    }

    deleteContracted():void{
      console.log(this.id)
      this.http.delete("http://localhost:8080/contracteds/"+this.id).subscribe(
        data =>  console.log(data)     
      )
      window.location.reload();
    }

    openModal(){
      this.dialog.open(SignatureComponent,{
        height: 'auto',
        width: 'auto',})
    }
    
    ifCheked(ob: MatCheckboxChange){
        this.contractedService.enabledSignatureSubject.next(ob.checked);
   console.log(this.contractedService.enabledSignatureSubject.value)
    }
  }



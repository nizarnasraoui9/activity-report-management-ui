import { Component, Input, OnInit, NgModule } from '@angular/core';
import {CraService} from '../../shared/services/cra.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CalendarComponent } from 'src/app/shared/components/calendar/calendar.component';
import { AccountService } from 'src/app/shared/services/account.service';
import { promise, Session } from 'protractor';
import {saveAs as importedSaveAs} from "file-saver";
import {Injectable} from '@angular/core';
import * as fileSaver from 'file-saver';
import { Subject } from 'rxjs';
import { ContractedService } from 'src/app/shared/services/contracted.service';

declare function test() : any

@Component({
  selector: 'app-view-cra-details',
  templateUrl: './view-cra-details.component.html',
  styleUrls: ['./view-cra-details.component.css']
})
export class ViewCraDetailsComponent implements OnInit {
  @Input() selectedCra;
  blob : Blob ;
  id:number;
  signatureObject : any
  fullDaysSum: number;
  halfDaysSum: number;
  totalDaysSum : number
  cra:any;
  workDays:any;
  month:String;
  intervenant : String;
  year:String;
  note:string;
  viewDate:string;
  isGenerated : boolean
  daysSelected: String[] = [];
  halfDaysSelected: any[] = [];
  generated = new Subject<String>();
  days :any[] = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  daysNames : String[] = []
  signatureBase64 : string = ""


  months:string[]=["Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Out","Septembre","Novembre","December"]; 
  
  constructor(private contractedService : ContractedService,public craService:CraService,private route: ActivatedRoute, private http:HttpClient, private Router : Router , private accountService : AccountService) { }
  
  ngOnInit(): void {
      this.accountService.getPersonalInformations(1).subscribe((res)=>{
        this.intervenant = res.firstName + " " +res.lastName
        
      })
    
    
    this.fullDaysSum = 0 ;
    this.halfDaysSum = 0 ;
    
    this.route.params.subscribe(params => {
    this.id=params.id;
    console.log(params)

    });
    this.craService.getCra(this.id).subscribe((response)=>{
      this.cra=response;
      this.workDays=this.cra.workDays;
      this.cra.workDays.forEach(element => {
        if(element.workedTime=="full") this.fullDaysSum++;
        if(element.workedTime=="half") this.halfDaysSum++;
      });
      this.craService.currentFullDayssSum.next(this.fullDaysSum)
      this.craService.currentHalfDaysSum.next(this.halfDaysSum)
      this.craService.currentSumWorkedDays.next(this.fullDaysSum + (this.halfDaysSum / 2)) ;
      this.viewDate=this.months[this.cra.month-1]+" "+this.cra.year;
    });
    this.month=this.cra.month;
    this.year=this.cra.year;
    
 

  }
  addNote(){
    if(this.note!=undefined){
      this.cra.note=this.note;
    this.craService.updateCra(this.cra).subscribe(()=>{
      console.log(this.note);
    });
    }
  }

  deleteCra(){
    this.http.delete("http://localhost:8080/cras/"+this.id).subscribe(
        (data) =>{  console.log(data)  
        this.Router.navigate(['main/cra']);
        location.reload;   
        })
      
    }
 

  getPdf() {
      let authKey = sessionStorage.getItem('auth-user');
    
      const httpOptions = {
        responseType: 'blob' as 'json',
        headers: new HttpHeaders({
          'Authorization': authKey,
        })
      };
    
      return this.http.get("http://localhost:8080/cras/download?fileName=craRepport.pdf", httpOptions);
    }



       async gerenatePdf() {   
        this.fullDaysSum = 0 ;
        this.halfDaysSum = 0 ;
        this.totalDaysSum = 0 ;
          
        this.craService.getCra(this.id).subscribe((response)=>{
          this.cra=response;
          console.log(response);
          this.workDays=this.cra.workDays;
          this.workDays.forEach(element => {
            if(element.workedTime=="full") this.fullDaysSum++;
            if(element.workedTime=="half") this.halfDaysSum++;
            let d = new Date(this.cra.year+"-"+this.cra.month+"-"+element.dayOfMonth);
            this.daysNames.push(this.days[d.getDay()])
            this.craService.currentFullDayssSum.next(this.fullDaysSum)
            this.craService.currentHalfDaysSum.next(this.halfDaysSum)
            this.craService.currentSumWorkedDays.next(this.fullDaysSum + (this.halfDaysSum / 2)) ;
        });   
            console.log(this.contractedService.enabledSignatureSubject.value);
            this.isGenerated = false ;
            console.log(this.craService.currentSumWorkedDays.value)
            this.viewDate=this.months[this.cra.month-1]+" "+this.cra.year;
            this
            this.accountService.getSignature().subscribe((res)=>{
              if(res.length !== 0){
                console.log('hh');
              this.signatureObject = res[0].signature;
              var splitted = this.signatureObject.split(",");
              this.signatureBase64 = splitted[1];
              }  
              if(this.contractedService.enabledSignatureSubject.value === false){
                this.signatureBase64=""
              }  

            this.totalDaysSum = this.fullDaysSum + (this.halfDaysSum / 2) ; 
            this.http.post("http://localhost:8080/cras/pdf",{
              id : this.id,
              date : this.viewDate,
              contractedName : this.cra.contracted.name ,
              clientName : this.cra.client.name,
              ContractedAdress : this.cra.contracted.streetNumber+" "+this.cra.contracted.streetName+" "+this.cra.contracted.postalCode+", "+this.cra.contracted.city,
              clientAdress : this.cra.client.streetNumber+" "+this.cra.client.streetName+" "+this.cra.client.postalCode+", " +this.cra.client.city ,
              intervenant : this.intervenant,
              fullDaysSum :""+this.craService.currentFullDayssSum.value,
              halfDaysSum :""+this.craService.currentHalfDaysSum.value,
              totalDaysSum :""+this.craService.currentSumWorkedDays.value,
              workDay: this.cra.workDays,
              daysNames : this.daysNames,
              signature : this.signatureBase64

            }).subscribe((data) => {console.log("generated") ;
            this.downloadPdf();
          });
        });

            });
           
      }
    
                        

    
      downloadPdf(){
            this.getPdf().subscribe((data : any) => {
            this.blob = new Blob([data], {type: 'application/pdf'});
            var downloadURL = window.URL.createObjectURL(data);
            var link = document.createElement('a');
            link.href = downloadURL;
            link.download = this.viewDate+".pdf";
            link.click();
            });
  
}
}
    
    



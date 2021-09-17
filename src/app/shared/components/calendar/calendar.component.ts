import { Component, Input, OnInit,ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CraService } from '../../services/cra.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CustomDateAdapter } from './dateAdapter';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  encapsulation:ViewEncapsulation.None,
  providers:[ CustomDateAdapter]
  
  
  
})
export class CalendarComponent implements OnInit {
  calendar:any;
  selectedCra:any;
  id:number;
  holidays:any[]=[];
  updatedCalendar:boolean=false;
  daysSelected: String[] = [];
  halfDaysSelected: any[] = [];
  event: any;
  halfSeleted: any=false;
  days :any[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  fullDaysSum : number ;
  halfDaysSum : number ;
  constructor(private http:HttpClient,private craService:CraService,private route: ActivatedRoute,private Router:Router) { }

  ngOnInit(): void {
    this.fullDaysSum = 0 ;
    this.halfDaysSum = 0 ;
    this.craService.isValid = false ;
    this.route.params.subscribe(params => {
      this.id=params.id;
    });
    this.craService.getCra(this.id).subscribe((response)=>{
      this.selectedCra=response;
      let month=this.selectedCra.month;
      if(month<10) month='0'+month;
      this.http.get<any>("https://etalab.github.io/jours-feries-france-data/json/metropole.json").subscribe((response)=>{
        for(var i in this.selectedCra.workDays){
          let workDay=this.selectedCra.workDays[i];
          let day=workDay.dayOfMonth;
          if(day<10) day='0'+day;
          
          if(workDay.workedTime=="full"){
            
            this.daysSelected.push(this.selectedCra.year+"-"+month+"-"+day)
          }
          else if(workDay.workedTime=="half"){
            this.halfDaysSelected.push(this.selectedCra.year+"-"+month+"-"+day)
          } 
          for(var j in response){
            let isday=this.daysSelected.find(x => x == j);
            let ishalfDay=this.halfDaysSelected.find(x => x == j);
            if(!isday && !ishalfDay){
              this.holidays.push(j);
            }
          }
        }
        CustomDateAdapter.year=this.selectedCra.year;
        CustomDateAdapter.month=this.selectedCra.month-1;
        this.updatedCalendar=true;
      });
      
      
    });
    this.isSelected(null);
  }
  clearCalendar(){
    this.daysSelected=[];
    this.halfDaysSelected=[];
    this.updateCraCalender();
    location.reload();

  }  
  streamOpened(event) {
    setTimeout(()=>{
    let elements = document.querySelectorAll('.endDate');
     let x =  elements[0].querySelectorAll('.mat-calendar-body-cell-content');
    x.forEach(y => {
      y.classList.add('newClass');
    });
    });
  }

  isSelected = (event: any) => {
    const date =
    event.getFullYear() +
    "-" +
    ("00" + (event.getMonth() + 1)).slice(-2) +
    "-" +
    ("00" + event.getDate()).slice(-2);
    let day=this.daysSelected.find(x => x == date);
    let halfDay=this.halfDaysSelected.find(x => x == date);
    let holiDay=this.holidays.find(x=>x==date);
    
 

    if(day) return "wholeDay";
    else if(halfDay) return "halfDay";
    else if(holiDay) return "holiDay";

    else return null;
  };

  select(event: any, calendar: any) {
    this.calendar=calendar;
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    const indexInDaysSelected = this.daysSelected.findIndex(x => x == date);
    const indexInHalfDaysSelected = this.halfDaysSelected.findIndex(x => x == date);
    const indexInHolidays = this.holidays.findIndex(x => x == date);
    if(indexInHolidays>=0 && !indexInDaysSelected && !indexInHalfDaysSelected){
      this.holidays.splice(indexInHolidays, 1);
      this.daysSelected.push(date);
    }
    else if (indexInDaysSelected < 0 && indexInHalfDaysSelected<0) this.daysSelected.push(date);
    else if (indexInDaysSelected >=0){
      this.daysSelected.splice(indexInDaysSelected, 1);
      this.halfDaysSelected.push(date);
    }
    else if (indexInDaysSelected >=0){
      this.daysSelected.splice(indexInDaysSelected, 1);
      this.halfDaysSelected.push(date);
    }
    else if (indexInHalfDaysSelected >= 0){
      this.halfDaysSelected.splice(indexInHalfDaysSelected, 1);
    }
    calendar.updateTodaysDate();

  }

  updateCraCalender():void{
    this.fullDaysSum = 0 ;
    this.halfDaysSum = 0 ;
    for(var i=0;i<this.selectedCra.workDays.length;i++){
      let day:any=this.selectedCra.workDays[i].dayOfMonth;
      if(day<10){
        day='0'+day;
      }
      let workedTime:any=Number(this.selectedCra.workDays[i].dayOfMonth+'0');
      if(this.daysSelected.find(x => x[8]+x[9] == day)){
        this.selectedCra.workDays[i].workedTime="full";
      }
      else if(this.halfDaysSelected.find(x => x[8]+x[9] == day)){
        this.selectedCra.workDays[i].workedTime="half";
      }
      else{
        this.selectedCra.workDays[i].workedTime="none";
      }
    }
    this.craService.updateCra(this.selectedCra).subscribe((response)=>{
        this.craService.isValid=true
          this.selectedCra=response;
          this.selectedCra.workDays.forEach(element => {
            if(element.workedTime=="full") this.fullDaysSum++;
            console.log(this.fullDaysSum)
            if(element.workedTime=="half") this.halfDaysSum++;
          })
        this.craService.currentSumWorkedDays.next(this.fullDaysSum + this.halfDaysSum/2)
        this.craService.currentFullDayssSum.next(this.fullDaysSum);
        this.craService.currentHalfDaysSum.next(this.halfDaysSum);

        console.log(this.selectedCra.workDays);
    })
  }

    

    fillUpCra(){
      var indice ;
      for(var i=0;i<this.selectedCra.workDays.length;i++){
        for (var j =0 ; j<this.holidays.length ; j++){
          var dayOfMonth = this.holidays[j].split("-")[2];
          var month = this.holidays[j].split("-")[1];
          var year = this.holidays[j].split("-")[0];
          if (this.selectedCra.workDays[i].dayOfMonth == dayOfMonth && 
            this.selectedCra.month == month && 
            this.selectedCra.year == year){
              indice = i ;
             }
            
      }
      let d = new Date(this.selectedCra.year+"-"+this.selectedCra.month+"-"+this.selectedCra.workDays[i].dayOfMonth);
      let dayName = this.days[d.getDay()];
      if ( dayName.localeCompare("Saturday") == 0 || dayName.localeCompare("Sunday") == 0 ){
        indice = i ;
      }
        if (i !== indice ){
          this.selectedCra.workDays[i].workedTime="full"; 
        }
      

      
    }
      this.craService.updateCra(this.selectedCra).subscribe((response)=>{
        location.reload();
      })
      
    }

    disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0) );
  };
  }
  




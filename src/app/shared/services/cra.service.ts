import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {PATH} from './paths';
import {TokenStorageService} from "../../core/_services/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class CraService {
  public currentSumWorkedDays: BehaviorSubject<number | null >;
  public currentFullDayssSum: BehaviorSubject<number | null >;
  public currentHalfDaysSum: BehaviorSubject<number | null >;
  public fullDaysSum :  Observable<number | null>;
  public halfDaysSum :  Observable<number | null>;
  public totalDaysSum : Observable<number | null>;
  isValid : boolean = false
  constructor(private http:HttpClient,private tokenService:TokenStorageService) {
    this.currentSumWorkedDays = new BehaviorSubject<number | null>(0 ? 0 : null);
    this.totalDaysSum = this.currentSumWorkedDays.asObservable();
    this.currentFullDayssSum = new BehaviorSubject<number | null>(0 ? 0 : null);
    this.fullDaysSum = this.currentSumWorkedDays.asObservable();
    this.currentHalfDaysSum = new BehaviorSubject<number | null>(0 ? 0 : null);
    this.halfDaysSum = this.currentSumWorkedDays.asObservable();
   }
  getAllCras(): Observable<any>{
    return this.http.get<any>(PATH+"cras/");
  }
  createCra(cra:any):Observable<any>{

    cra.username=this.tokenService.getUser();
    
    return this.http.post<any>(PATH+"cras",cra);
  }
  getCra(id:number):Observable<any>{
    return this.http.get<any>(PATH+"cras/"+id);
  }

  updateCra(cra:any):Observable<any>{
    return this.http.put<any>(PATH+"cras/"+cra.id,cra);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {PATH} from './paths';

@Injectable({
  providedIn: 'root'
})
export class ContractedService {
  public enabledSignatureSubject: BehaviorSubject<boolean | null >;
  public enabledSignature :  Observable<boolean | null>;
  constructor(private http: HttpClient) {
    this.enabledSignatureSubject = new BehaviorSubject<boolean | null>(false ? false : null);
    this.enabledSignature = this.enabledSignatureSubject.asObservable();
   }
  addContracted(contracted: any): Observable<any>{
    return this.http.post<any>(PATH+"contracteds",contracted);
  }
  getAllContracteds(): Observable<any>{
    return this.http.get<any>(PATH+"contracteds");
  }
  getContracted(id:number):Observable<any>{
    return this.http.get<any>(PATH+"contracteds/"+id);
  }
  updateContracted(contracted:any):Observable<any>{
    console.log(contracted);
    return this.http.put<any>(PATH+"contracteds/"+contracted.id,contracted);
  }
}

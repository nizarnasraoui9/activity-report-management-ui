import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {PATH} from './paths';
import { idTokenResult } from '@angular/fire/auth-guard';
import {TokenStorageService} from "../../core/_services/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  firtName : String ;
  lastName : String ;
  constructor(private http:HttpClient,private tokenService:TokenStorageService) { }

  getPersonalInformations(id:number): Observable<any>{
    return this.http.get(PATH+'accounts/');

  }
  updatePersonalInformations(id:number,form:any): Observable<any>{
    const user={
      "accountId" : id ,
      "username": form.username,
      "firstName": form.firstName,
      "lastName": form.lastName,
      "email": form.email,
      "password" : form.password,
      "enabled": true,
      "accountNonExpired": true,
      "accountNonLocked": true,
      "avatar" : form.avatar 
    };
    return this.http.put(PATH+'accounts/'+id,user);
  }

  addSignature(signature : any) : Observable<any>{
    console.log(signature);
    return this.http.post<any>(PATH+"signatures",signature);
    }
  

  getSignature():Observable<any>{
    return this.http.get<any>(PATH+"signatures/");
  }

  updateSignature(signature : any):Observable<any>{
    return this.http.put<any>(PATH+"signatures/"+signature.id,signature);
  }

  update
}

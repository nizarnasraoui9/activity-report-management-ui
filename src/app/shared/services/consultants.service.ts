import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { Article } from '../models/Article';
import {PATH} from './paths';

@Injectable({
  providedIn: 'root'
})
export class ConsultantsService {

  constructor(private http:HttpClient) { }

  getAllUsers():Observable<any>{
    return this.http.get<any>(PATH+"accounts/dynamic");

  } 

}
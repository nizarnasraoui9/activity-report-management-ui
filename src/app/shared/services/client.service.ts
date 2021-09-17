import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { TokenStorageService } from 'src/app/core/_services/token-storage.service';
import {PATH} from './paths';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  headers: HttpHeaders;

  constructor(private http: HttpClient,private tokenStorageService: TokenStorageService) {
    
   }
  

  addClient(client: any): Observable<any>{
    return this.http.post<any>(PATH+"clients",client);
  }
  getAllClients(): Observable<any>{
    return this.http.get<any>(PATH+"clients/dynamic");
  }
  getClient(id:number):Observable<any>{
    return this.http.get<any>(PATH+"clients/"+id);
  }
  updateClient(client:any):Observable<any>{
    return this.http.put<any>(PATH+"clients/"+client.id,client);
  }
}

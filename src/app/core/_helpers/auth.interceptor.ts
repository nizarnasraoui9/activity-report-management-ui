import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../_services/token-storage.service';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end
// const TOKEN_HEADER_KEY = 'x-access-token';   // for Node.js Express back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.token.getToken();
    const username = this.token.getUser();
    const sirene= req.url.slice(8,31)==='entreprise.data.gouv.fr';
    // console.log(req.url.slice(8,31));
    // console.log(sirene);
    if (token != null && req.url!=='https://etalab.github.io/jours-feries-france-data/json/metropole.json' && !sirene) {

      req = req.clone({
        setHeaders: {
          username: username,
          Authorization: 'Bearer ' + token
        }
      })
    }



    return next.handle(req);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];

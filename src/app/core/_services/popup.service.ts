import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { 
  }

  error(text:string){
    Swal.fire({
      title: 'Erreur!',
      text,
      icon: 'error',
      timer: 1500
    })
  }

  success(text:string){
    Swal.fire({
      title: 'Validé!',
      text,
      icon: 'success',
      timer: 1500
    })
  }
}

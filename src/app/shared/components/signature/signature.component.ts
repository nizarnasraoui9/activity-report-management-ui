import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad'
import { AccountService } from '../../services/account.service';
import {TokenStorageService} from "../../../core/_services/token-storage.service";


@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.css']
})
export class SignatureComponent implements OnInit {
  title = 'Angular signature example';
  signatureImg: string;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  signature : any
  signaturePadOptions: Object = { 
    'minWidth': 2,
    'canvasWidth': 700,
    'canvasHeight': 300
  };
  constructor( private accountService : AccountService , private tokenService:TokenStorageService) { }
  ngOnInit(): void {
    this.accountService.getSignature().subscribe((res)=>{
      this.signature = res[0];
      this.signatureImg = res.signature
      console.log(this.signature);
    })
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 2); 
    this.signaturePad.clear(); 
  }

  drawComplete() {
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    console.log('begin drawing');
  }

  clearSignature() {
    this.signaturePad.clear();
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    const signature ={
      "signature" : this.signatureImg ,
      "username" : this.tokenService.getUser()
    }
    this.accountService.addSignature(signature).subscribe();   
    window.location.reload() ;

  }

  updatePad(){

    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    const signature ={
      "id" : this.signature.id ,
      "signature" : this.signatureImg ,
      "username" : this.tokenService.getUser()
    }
    this.accountService.updateSignature(signature).subscribe(
    );   
    window.location.reload() ;

  }

}
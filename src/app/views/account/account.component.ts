import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../shared/services/account.service';
import { MatDialog } from '@angular/material/dialog';
import { SignatureComponent } from '../../shared/components/signature/signature.component';
import { HttpClient } from '@angular/common/http';
import { Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})



export class AccountComponent implements OnInit {

  form = new FormGroup({
    email : new FormControl(),
    firstname: new FormControl(),
    lastname: new FormControl(),
  })
  signatureImg : String
  signatureId : number
  id : number ;
  account : any
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  avatar : String
  constructor(private accountService:AccountService,private dialog : MatDialog , private http : HttpClient) { }

  ngOnInit(): void {

    this.accountService.getPersonalInformations(1).subscribe((res)=>{
      this.account = res 
      console.log(this.account)
      this.form.setValue({
      firstname : res.firstName,
      lastname :res.lastName,
      email :res.email
      })
      this.avatar = res.avatar
      console.log(this.form.value)
    })
    this.accountService.getSignature().subscribe((res)=>{
      this.signatureImg = res[0].signature
      this.signatureId = res[0].id
      console.log(res);
    })

  }
  onSubmit(){
    console.log(this.account.email);
    this.accountService.updatePersonalInformations(this.account.accountId,
      {
        "accountId" : this.account.accountId,
        "username": this.account.username,
        "password": this.account.password,
        "firstName": this.form.value.firstname,
        "lastName": this.form.value.lastname,
        "email": this.account.email,
        "enabled": true,
        "accountNonExpired": true,
        "accountNonLocked": true,
        "avatar": this.account.avatar
      }).subscribe((res)=>{
        console.log(res)
    })
  }

  openModal(){
      this.dialog.open(SignatureComponent,{
        height: 'auto',
        width: 'auto',})
    }

  deleteSignature(){
    this.http.delete("http://localhost:8080/signatures/"+this.signatureId).subscribe(
        
      )
      window.location.reload()
  }

  change(fileInput : any ){
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'Maximum size allowed is ' + max_size / 1000 + 'Mb';

            return false;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];

                console.log(img_height, img_width);


                if (img_height > max_height && img_width > max_width) {
                    this.imageError =
                        'Maximum dimentions allowed ' +
                        max_height +
                        '*' +
                        max_width +
                        'px';
                    return false;
                } else {
                    const imgBase64Path = e.target.result;
                    this.cardImageBase64 = imgBase64Path;
                    this.isImageSaved = true;
                    this.accountService.updatePersonalInformations(this.account.accountId,
                      {
                        "accountId" : this.account.accountId,
                        "username": this.account.username,
                        "password": this.account.password,
                        "firstName": this.form.value.firstname,
                        "lastName": this.form.value.lastname,
                        "email": this.account.email,
                        "enabled": true,
                        "accountNonExpired": true,
                        "accountNonLocked": true,
                        "avatar": this.cardImageBase64
                      }).subscribe((res)=>{
                        window.location.reload

                    })
                }
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
    }
}
  }





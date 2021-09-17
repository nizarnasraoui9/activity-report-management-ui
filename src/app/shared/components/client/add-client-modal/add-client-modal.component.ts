import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-client-modal',
  templateUrl: './add-client-modal.component.html',
  styleUrls: ['./add-client-modal.component.css']
})
export class AddClientModalComponent implements OnInit {
  frensh: boolean = true;
  form = new FormGroup({
    name: new FormControl('',[]),
    siret: new FormControl('',[]),
      uniqueIdentifier: new FormControl('',[]),
      country: new FormControl('',[])

    });

  constructor(private clientService:ClientService,private modal:MatDialog) { }

  ngOnInit(): void {

  }
  selectFrensh(){
    this.frensh=true;
  }
  selectForeign(){
    this.frensh=false;
  }

  onSubmit(){
    if(this.form.status=="VALID"){
      let client:any={
        name:this.form.value.name,
        siret:this.form.value.siret,
        uniqueIdentifier:this.form.value.uniqueIdentifier,
        country:this.form.value.country
      }
      console.log(this.form.value.siret);
      this.clientService.addClient(client).subscribe((response)=>{
        console.log(response);
        this.modal.closeAll();
      });
  }
  else{
    console.log("error");
  }
  window.location.reload();
    }


}

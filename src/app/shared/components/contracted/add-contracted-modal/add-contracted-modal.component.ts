import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { ContractedService } from '../../../services/contracted.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-contracted-modal',
  templateUrl: './add-contracted-modal.component.html',
  styleUrls: ['./add-contracted-modal.component.css']
})
export class AddContractedModalComponent implements OnInit {
  frensh: boolean = true;
  form = new FormGroup({
    name: new FormControl('',[]),
    siret: new FormControl('',[]),
      uniqueIdentifier: new FormControl('',[]),
      country: new FormControl('',[])

    });

  constructor(private contractedService:ContractedService,private modal:MatDialog) { }

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
      let contracted:any={
        name:this.form.value.name,
        siret:this.form.value.siret,
        uniqueIdentifier:this.form.value.uniqueIdentifier,
        country:this.form.value.country
      }
      console.log(this.form.value.siret);
      this.contractedService.addContracted(contracted).subscribe((response)=>{
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

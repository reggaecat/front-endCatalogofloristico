import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { familiaServiceService } from '../familia-service.service';

@Component({
  selector: 'app-dialogDelete',
  templateUrl: './dialogDelete.component.html',
  styleUrls: ['./dialogDelete.component.css']
})
export class DialogDeleteComponent implements OnInit {
  
  ordenform:FormGroup;

  constructor(public familiaService:familiaServiceService, public fb:FormBuilder){}


  panelOpenState = false;

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  ngOnInit():void{
    this.ordenform=this.fb.group({
      nombre:['',Validators.required]
    })
  }
  guardar():void{
    this.familiaService.create(this.ordenform.value).subscribe(resp=>{

    },
    error=>{console.error(error)}
    )
  }


}

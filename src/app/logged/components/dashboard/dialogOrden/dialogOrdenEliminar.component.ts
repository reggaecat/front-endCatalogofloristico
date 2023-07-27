import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ordenServiceService } from '../orden-service.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialogOrdenEliminar.component.html',
  styleUrls: ['./dialogOrdenEliminar.component.css']
})
export class DialogOrdenEliminarComponent implements OnInit {
  
  ordenform:FormGroup;
  ordenes:any;

  constructor(public ordenService:ordenServiceService, public fb:FormBuilder){}


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
 

}

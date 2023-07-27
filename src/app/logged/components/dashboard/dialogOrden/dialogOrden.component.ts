import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ordenServiceService } from '../orden-service.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialogOrden.component.html',
  styleUrls: ['./dialogOrden.component.css']
})
export class DialogOrdenComponent implements OnInit {
  
  ordenform:FormGroup;

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
      id:0,
      nombre:['',Validators.required]
    })

   // console.log(this.ordenform)
  }
  guardar():void{
    this.ordenService.create(this.ordenform.value).subscribe(resp=>{
    },
    error=>{console.error(error)}
    )
    //console.log(this.ordenform);
  }

}

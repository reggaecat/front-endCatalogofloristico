import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ordenServiceService } from '../orden-service.service';

@Component({
  selector: 'app-dialogEditar',
  templateUrl: './dialogOrdenEditar.component.html',
  styleUrls: ['./dialogOrdenEditar.component.css']
})
export class DialogOrdenEditarComponent implements OnInit {
  //@Input()dataEntrante:any;
  ordenform:FormGroup;
  ordenes:any;
  orden:any;

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
      id:[],
      nombre:['',Validators.required]
    })
    //console.log(this.dataEntrante);
  }
  guardar():void{
    this.ordenService.create(this.ordenform.value).subscribe(resp=>{

    },
    error=>{console.error(error)}
    )
  }


  recibir(a:any){
    console.log(a);
    this.orden=a
   //console.log(this.orden);
  }
  editar(){
    this.ordenform.setValue({
      id:this.orden.id,
      nombre:this.orden.nombre,
    })
    console.log(this.orden)
  }

  

}

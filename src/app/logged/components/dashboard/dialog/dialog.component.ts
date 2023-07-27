import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { familiaServiceService } from '../familia-service.service';
import { FloristicaServiceService } from '../floristica-service.service';
import { ordenServiceService } from '../orden-service.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  public archivos :any=[];
  imagenUrl: string='';
  imagenUrlAux:string='';
  imagen: File= new File([], "");
  public previsualizacion:string;
  floristicaform:FormGroup;
  ordenes:any;
  familias:any;

  idfam:any;
  loading:boolean;

  public plantas={
    id_floristica:0,
      nombre_familia:[''],
      nombre_orden:[''],
      nombre:[''],
      nombre_cientifica:[''],
      nombre_quichua:[''],
      descripcion:[''],
      foto:null,
  }

  

  constructor(public floristicaService:FloristicaServiceService,
     public fb:FormBuilder,
     public ordens:ordenServiceService,
     public familia:familiaServiceService,
     public sanitazer:DomSanitizer){}

 
  panelOpenState = false;

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  ngOnInit():void{
    this.floristicaform=this.fb.group({
      id_floristica:[''],
      nombre_familia:[''],
      nombre_orden:[''],
      nombre:[''],
      nombre_cientifica:[''],
      nombre_quichua:[''],
      descripcion:[''],
      //foto:File[''],
      //fileSource: new FormControl('', [Validators.required])
    });;

    
    this.ordens.getAll().subscribe(resp=>{this.ordenes=resp;});
    this.familia.getAll().subscribe(resp=>{this.familias=resp;});

   // console.log(this.ordenform)
  }

  capturarFile(event):any{
    const archivocapturado=event.target.files[0];
    this.extraerbase64(archivocapturado).then((imagen:any)=>{
      this.previsualizacion=imagen.base;
      console.log(imagen)
    });
    
    this.archivos.push(archivocapturado)
    //console.log(event.target.files)
    /*if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.floristicaform.patchValue({
        fileSource: file
      });
    }*/
  }

  onFotoSeleccionada(event: any)  {
    
    const archivocapturado=event.target.files[0];
    this.extraerbase64(archivocapturado).then((imagen:any)=>{
      this.previsualizacion=imagen.base;
      console.log(imagen)
    });
    
    this.archivos.push(archivocapturado) 
    if(event.target.files && event.target.files.length > 0){
      this.imagen = event.target.files[0];
      console.log(this.imagen );
      const selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imagenUrl = event.target.result;
      };
      reader.readAsDataURL(selectedFile);
    }else{
      this.imagenUrl=this.imagenUrlAux;
    }
  }

  extraerbase64=async($event:any)=>new Promise((resolve,reject)=>{
    try{
      const unsafeImg=window.URL.createObjectURL($event);
      const image =this.sanitazer.bypassSecurityTrustUrl(unsafeImg);
      const reader=new FileReader();
      reader.readAsDataURL($event);
      reader.onload=()=>{
        resolve({base:reader.result});
      };
      reader.onerror=error=>{
        resolve({
          base:null
        });
      };
    }catch(e){
      return null;
    }
  })

  obtenervalor(a:any):void{
    this.idfam=a;
    console.log(this.idfam);
  }
  guardar():void{
    this.loading=true;
    const formData = new FormData();
        formData.append('user', JSON.stringify(this.floristicaform.value));
        formData.append('imagen', this.imagen);
        //this.floristicaform.value.foto=this.archivos;
    //console.log(formData);
    this.floristicaService.create(formData).subscribe(resp=>{
      this.loading=false;
    },
    
    error=>{console.error(error)}
    )
    //console.log(this.floristicaform);
  }
  

}

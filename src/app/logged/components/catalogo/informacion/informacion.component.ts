import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Orden } from '../../dashboard/orden';
import { Floristica } from './floristica';
import { FloristicaServiceService } from './floristica-service.service';
export interface plantaModels {
  id_floristica:0,
  nombre_familia:[''],
  nombre_orden:[''],
  nombre:[''],
  nombre_cientifica:[''],
  nombre_quichua:[''],
  descripcion:[''],
  foto: null,
}


@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit{


  constructor(
    //@Inject(MAT_DIALOG_DATA) public data:plantaModels,
    public floristicaService:FloristicaServiceService,
    public fb:FormBuilder,
    public sanitazer:DomSanitizer,private route: ActivatedRoute,
    ) {}
    
    
    
    onNoClick(): void {
    
    }
    
    plantaforms:any = [];
    plantaform:FormGroup;
    orden!:Orden[];
    floristica!:Floristica[];
    public archivos :any=[];
    imagenUrl: string='';
    imagenUrlAux:string='';
    imagen: File= new File([], "");
    public previsualizacion:string;
    floristicaform:FormGroup;
    ordenes:any;
    familias:any;
    parametro:any;
    
    
    idfam:any;
    
    ngOnInit(): void {
      this.parametro = this.route.snapshot.paramMap.get('parametro');
      console.log(this.parametro);
    
    
      this.floristicaService.getImagen(this.parametro).subscribe((imagen: Blob)=>{
        if (imagen.size > 0) {
          const reader = new FileReader();
          reader.onload = () => {
            this.imagenUrl = reader.result as string;
          };
          reader.readAsDataURL(imagen);
        }else{
          this.imagenUrl= '/assets/imagenes/usuario.png';
        }
      })
    
    this.plantaform=this.fb.group({
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
    console.log(this.plantaform);
    
    console.log(this.parametro);
    
    this.floristicaService.get(this.parametro).subscribe(
      (dato:any) => {
        console.log(dato)
        this.plantaforms =dato
      }
    );
    
    
    }
}


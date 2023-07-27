
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Familia } from '../dashboard/familia';
import { familiaServiceService } from '../dashboard/familia-service.service';
import { Orden } from '../dashboard/orden';
import { ordenServiceService } from '../dashboard/orden-service.service';
import { Floristica } from './floristica';
import { FloristicaServiceService } from './floristica-service.service';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

export interface ChipColor {
  name: string;
  color: ThemePalette;
}

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
})




export class CatalogoComponent implements OnInit { availableColors: ChipColor[] = [
  {name: 'none', color: undefined},
  {name: 'Primary', color: 'primary'},
  {name: 'Accent', color: 'accent'},
  {name: 'Warn', color: 'warn'},
];
  filtro: string = '';  

  floristica!:Floristica[];
  orden!:Orden[];
  familia!:Familia[];
  constructor(private floristica_service:FloristicaServiceService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private ordenService:ordenServiceService,
    private familiaService:familiaServiceService){}
  imagenUrl: string=''; 
  floristicaid=0;
  public archivoHtmlUrl: SafeResourceUrl;


  ngOnInit(): void {

    this.floristica_service.getAll().subscribe(
      e=>this.floristica=e
    );
    this.ordenService.getAll().subscribe(
      e=>this.orden=e
    );
    this.familiaService.getAll().subscribe(
      e=>this.familia=e
    );

    this.floristica_service.getImagen(1).subscribe((imagen: Blob)=>{
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
  }

  filtrarElementos(): any[] {
    if (this.filtro.trim() === '') {
      return this.floristica; // Si no hay filtro, mostrar todos los elementos
    }
  
    return this.floristica.filter(elemento => elemento.nombre.includes(this.filtro)); // Filtrar por el nombre del elemento
  }

  ordenarAlfabeticamente() {
    this.floristica.sort(); // Ordenar la lista alfabéticamente
  }

  

  abrirHTML() {
    const rutaArchivoHtml = '/informacionV2.html'; // Ruta relativa del componente que contiene el archivo HTML
    this.router.navigateByUrl(rutaArchivoHtml);
  }

  getGridColumns(): number {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (screenWidth >= 1200) {
      return 4; // Para pantallas grandes, se muestran 4 columnas
    } else if (screenWidth >= 992) {
      return 3; // Para pantallas medianas, se muestran 3 columnas
    } else if (screenWidth >= 768) {
      return 2; // Para pantallas pequeñas, se muestran 2 columnas
    } else {
      return 1; // Para pantallas muy pequeñas, se muestra solo 1 columna
    }
  }
  
  getTileColspan(): number {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (screenWidth >= 1200) {
      return 2; // Para pantallas grandes, los elementos ocupan 2 columnas
    } else {
      return 1; // Para el resto de pantallas, los elementos ocupan 1 columna
    }
  }
  
  getTileRowspan(): number {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (screenWidth >= 1200) {
      return 3; // Para pantallas grandes, los elementos ocupan 3 filas
    } else {
      return 1; // Para el resto de pantallas, los elementos ocupan 1 fila
    }
  }
  list: Tile[] = [
    {text: 'one', cols: 1, rows: 2, color: 'lightblue'},
    {text: '2', cols: 2, rows: 2, color: 'lightgreen'},
    {text: '3', cols: 1, rows: 3, color: 'lightpink'},
    {text: '4', cols: 3, rows: 3, color: '#DDBDF1'},
    {text: '5', cols: 1, rows: 2, color: 'lightblue'},
    {text: 'one', cols: 1, rows: 2, color: 'lightblue'},
    {text: '2', cols: 2, rows: 2, color: 'lightgreen'},
    {text: '3', cols: 1, rows: 3, color: 'lightpink'},
    {text: '4', cols: 3, rows: 3, color: '#DDBDF1'},
    {text: '5', cols: 1, rows: 2, color: 'lightblue'},
    
    
  ];


}

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
selector: 'informacionV2',
templateUrl: 'informacionV2.html',
styleUrls: ['./informacionV2.css']
})

export class Viewinformacion{
constructor(
@Inject(MAT_DIALOG_DATA) public data:plantaModels,
public floristicaService:FloristicaServiceService,
public fb:FormBuilder,
public sanitazer:DomSanitizer,
public ordens:ordenServiceService,
 public familia:familiaServiceService,
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


idfam:any;

ngOnInit(): void {


  this.floristicaService.getImagen(this.data.id_floristica).subscribe((imagen: Blob)=>{
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

console.log(this.data.id_floristica);

this.floristicaService.get(this.data.id_floristica).subscribe(
  (dato:any) => {
    console.log(dato)
    this.plantaforms =dato
  }
);


}


}

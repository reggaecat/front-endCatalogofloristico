import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { DialogComponent } from './dialog/dialog.component';
//import { DialogOrdenComponent } from './dialog/dialogOrden.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DialogFamiliaComponent } from './dialogFamilia/dialogFamilia.component';
import { DialogOrdenComponent } from './dialogOrden/dialogOrden.component';
import { DialogOrdenEliminarComponent } from './dialogOrden/dialogOrdenEliminar.component';
import { Familia } from './familia';
import { familiaServiceService } from './familia-service.service';
import { Floristica } from './floristica';
import { FloristicaServiceService } from './floristica-service.service';
import { Orden } from './orden';
import { ordenServiceService } from './orden-service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})




export class DashboardComponent implements AfterViewInit, OnInit {
  floristica!:Floristica[];
  orden!:Orden[];
  familia!:Familia[];
  dataSource = new MatTableDataSource<Floristica>;
  dataSource1 = new MatTableDataSource<Orden>;
  dataSource2 = new MatTableDataSource<Familia>;
  showMe:boolean=false
  showMe1:boolean=true
  showMe2:boolean=true
  abr:number=1
  //ordenform:FormGroup;
  ordenes:any;
  

 
  @Output()
  enviar:EventEmitter<any>=new EventEmitter<any>();
  ordens:ordenServiceService;
  
  constructor(private floristica_service:FloristicaServiceService,
              private orden_service:ordenServiceService,
              private familia_service:familiaServiceService, 
              private breakpointObserver: BreakpointObserver, 
              public dialog: MatDialog, 
              public dialogOrden: MatDialog,
              public ordenService:ordenServiceService, 
              public familiaService: familiaServiceService,
              public floristicaService: FloristicaServiceService,
              public fb:FormBuilder,
              ){}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent,{
      width: '800px',
      height: '570px'
      //data: {name: this.name, animal: this.animal},
    });

    //dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      //this.animal = result;
    //});
  }

  openDialogOrden(): void {
    const dialogRef = this.dialog.open(DialogOrdenComponent,{
      width: '300px',
      height: '370px'
      //data: {name: this.name, animal: this.animal},
    });

    //dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      //this.animal = result;
    //});
  }

  openDialogFamilia(): void {
    const dialogRef = this.dialog.open(DialogFamiliaComponent,{
      width: '300px',
      height: '370px'
      //data: {name: this.name, animal: this.animal},
    });

    //dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      //this.animal = result;
    //});
  }

  /*openDialogOrdenEditar(a:any): void {
    this.ordens=a;
    //console.log(this.ordens);
    this.enviar.emit({data:a});
    
    const dialogRef = this.dialog.open(DialogOrdenEditarComponent,{
      width: '300px',
      height: '370px'
      //data: {name: this.name, animal: this.animal},
    });
    //this.ordens.editar(a)
    //dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      //this.animal = result;
    //});
    //console.log(this.enviar.emit(this.ordens));
    
    //console.log({data:a});
    this.ordens=a;
    
  }*/

  openDialogOrdenEditar(id:any): void {
    const dialogRef = this.dialog.open(ViewOrden, {
      data: {id: id},
      width: '300px',
      height: '370px'
    });
    
  }

  openDialogfamiliaEditar(id:any): void {
    const dialogRef = this.dialog.open(ViewFamilia, {
      data: {id: id},
      width: '300px',
      height: '370px'
    });
    
  }
  openDialogplantasEditar(id:any): void {
    const dialogRef = this.dialog.open(Viewplantas, {
      data: {id_floristica: id},
      width: '800px',
      height: '570px'
    });
    
  }
  

  openDialogOrdenEliminar(): void {
    const dialogRef = this.dialog.open(DialogOrdenEliminarComponent,{
      width: '300px',
      height: '370px'
      //data: {name: this.name, animal: this.animal},
    });

    //dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      //this.animal = result;
    //});
  }

  eliminarorden(orden):void{
    this.ordenService.delete(orden.id).subscribe(resp=>{
      console.log(resp)
      if(resp==true){
        this.ordenes.pop(orden)
      }
    }
    )
  }

  eliminarfamilia(familia):void{
    this.familiaService.delete(familia.id).subscribe(resp=>{
      console.log(resp)
      if(resp==true){ 
        this.ordenes.pop(familia)
      }
    }
    )
  }

  eliminarplantas(planta):void{
    this.floristicaService.delete(planta.id_floristica).subscribe(resp=>{
      console.log(resp)
      if(resp==true){ 
        this.ordenes.pop(planta)
      }
    }
    )
  }

  abrirdialogAgregar(){
    if(this.abr==1){
      this.openDialog();
    }else{
      if(this.abr==2){
        this.openDialogOrden();
      }else{
        this.openDialogFamilia();
      }
    }
  }


  toogleTag(a:number){
    if(a==1){
      this.abr=1
    //window.location.reload();
    this.showMe=false
    this.showMe1=true
    this.showMe2=true

    }else{
      if(a==2){
        this.abr=2
     // window.location.reload();
      this.showMe=true
      this.showMe1=false
      this.showMe2=true
    
      }else{
        this.abr=3
       // window.location.reload();
        this.showMe=true
        this.showMe1=true
        this.showMe2=false
      }
    }
  }


  ngOnInit(): void {
    this.floristica_service.getAll().subscribe(
      e=>{this.floristica=e;
          this.dataSource.data=this.floristica;
      }
    ); this.orden_service.getAll().subscribe(
      e=>{this.orden=e;
          this.dataSource1.data=this.orden;
      }
    );
    this.familia_service.getAll().subscribe(
      e=>{this.familia=e;
          this.dataSource2.data=this.familia;
      }
    );
   
    }
    
  

   displayedColumns: string[] = ['position', 'nombre', 'nombre_cientifico','nombre_quichua', 'nombre_familia','nombre_orden','descripcion','editar','eliminar'];
   displayedColumns1: string[] = ['position', 'nombre','editar','eliminar'];
   displayedColumns2: string[] = ['position', 'nombre','editar','eliminar'];
   //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild('MatPaginator1',{static:false}) MatPaginator1: MatPaginator;
  @ViewChild('allPaginator',{static:false}) allPaginator: MatPaginator;
  @ViewChild('aspaginator3',{static:false}) aspaginator3: MatPaginator;

  

  ngAfterViewInit() {
    this.dataSource.paginator = this.MatPaginator1;;
    this.dataSource1.paginator = this.allPaginator;;
    this.dataSource2.paginator = this.aspaginator3;
    
  }

  
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 3', cols: 1, rows: 1 },
          
        ];
      }
      return [

        { title: 'Card 3', cols: 2, rows: 2 },

      ];
    })
  );
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }
  
}







export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];

//Editar Orden

export interface ordenModels {
  id: 0;
  Nombre: '';
}

@Component({
  selector: 'dialogOrdenVersion2',
  templateUrl: 'dialogOrdenVersion2.html',
  styleUrls: ['./dialogOrdenVersion2.css']
})

export class ViewOrden{
  constructor(
    public dialogRef: MatDialogRef<ViewOrden>,
    @Inject(MAT_DIALOG_DATA) public data:ordenModels,
    public ordenService:ordenServiceService,
    public fb:FormBuilder,
  ) {}
  
  dataSource1 = new MatTableDataSource<Orden>;

  panelOpenState = false;

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  

 onNoClick(): void {
    this.dialogRef.close();
  }

  ordenforms:any = [];
  ordenform:FormGroup;
  orden!:Orden[];

  ngOnInit(): void {
    this.ordenService.getAll().subscribe(
      e=>{this.orden=e
      }
    );

    this.ordenform=this.fb.group({
      id:[''],
      nombre:['',Validators.required]
    });
    console.log(this.ordenform);

    console.log(this.data.id);
    
    this.ordenService.get(this.data.id).subscribe(
      (dato:any) => {
        console.log(dato)
        this.ordenforms =dato
      }
    );
  }

  guardar():void{
    this.ordenform.value.id=this.data.id;
    this.ordenService.create(this.ordenform.value).subscribe(resp=>{
      this.ordenform.reset();
      this.orden=this.orden.filter(orden=>resp.id!==orden.id);
      console.log(this.orden);
    },
    error=>{console.error(error)}
    )
  }

}
//Editar Familia
export interface FamiliaModels {
  id: 0;
  Nombre: '';
}

@Component({
  selector: 'dialogFamiliaVersion2',
  templateUrl: 'dialogFamiliaVersion2.html',
  styleUrls: ['./dialogOrdenVersion2.css']
})

export class ViewFamilia{
  constructor(
    public dialogRef: MatDialogRef<ViewFamilia>,
    @Inject(MAT_DIALOG_DATA) public data:FamiliaModels,
    public familiaService:familiaServiceService,
    public fb:FormBuilder,
  ) {}
  
  dataSource1 = new MatTableDataSource<Familia>;

  panelOpenState = false;

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  

 onNoClick(): void {
    this.dialogRef.close();
  }

  familiaforms:any = [];
  familiaform:FormGroup;
  familia!:Orden[];

  ngOnInit(): void {
    this.familiaService.getAll().subscribe(
      e=>{this.familia=e
      }
    );

    this.familiaform=this.fb.group({
      id:[''],
      nombre:['',Validators.required]
    });
    console.log(this.familiaform);

    console.log(this.data.id);
    
    this.familiaService.get(this.data.id).subscribe(
      (dato:any) => {
        console.log(dato)
        this.familiaforms =dato
      }
    );
  }

  guardar():void{
    this.familiaform.value.id=this.data.id;
    this.familiaService.create(this.familiaform.value).subscribe(resp=>{
      this.familiaform.reset();
      this.familia=this.familia.filter(familia=>resp.id!==familia.id);
      console.log(this.familia);
    },
    error=>{console.error(error)}
    )
  }

}
//editar plantas

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
  selector: 'dialogPlantasVersion2',
  templateUrl: 'dialogPlantasVersion2.html',
  styleUrls: ['./dialogPlantasVersion2.css']
})

export class Viewplantas{
  constructor(
    public dialogRef: MatDialogRef<Viewplantas>,
    @Inject(MAT_DIALOG_DATA) public data:plantaModels,
    public floristicaService:FloristicaServiceService,
    public fb:FormBuilder,
    public sanitazer:DomSanitizer,
    public ordens:ordenServiceService,
     public familia:familiaServiceService,
  ) {}
  
  dataSource1 = new MatTableDataSource<Orden>;

  panelOpenState = false;

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  

 onNoClick(): void {
    this.dialogRef.close();
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
  loading:boolean;

  idfam:any;

  ngOnInit(): void {
    this.floristicaService.getAll().subscribe(
      e=>{this.floristica=e
      }
      
    );
    this.ordens.getAll().subscribe(resp=>{this.ordenes=resp;});
    this.familia.getAll().subscribe(resp=>{this.familias=resp;});

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
    this.previsualizacion="//localhost:8080/plantas/"+this.data.id_floristica+"/imagen"
    
  
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

  guardar():void{
    const formData = new FormData();
    this.plantaform.value.id_floristica=this.data.id_floristica;
    
    formData.append('user', JSON.stringify(this.plantaform.value));
    formData.append('imagen', this.imagen);
    //this.floristicaform.value.foto=this.archivos;
    //console.log(formData);
    this.floristicaService.create(formData).subscribe(resp=>{
      this.plantaform.reset();
      this.floristica=this.floristica.filter(orden=>resp.id_floristica!==orden.id_floristica);
   },
    error=>{console.error(error)}
   )
    //console.log(this.floristicaform);
  }

}
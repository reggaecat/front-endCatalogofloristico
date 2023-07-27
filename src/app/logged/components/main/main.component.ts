import { Component, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Floristica } from '../catalogo/floristica';
import { FloristicaServiceService } from './floristica-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./css/creative-studio.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MainComponent {
  myimage:string="../imagenes/flora.jpg";
  filtro: string = '';  
  floristica!:Floristica[];

  constructor(private floristica_service:FloristicaServiceService,
    private sanitizer: DomSanitizer,
    private router: Router,){}

  ngOnInit(): void {

    this.floristica_service.getAll().subscribe(
      e=>this.floristica=e
    );
  }


  filtrarElementos(): any[] {
    if (this.filtro.trim() === '') {
      return this.floristica; // Si no hay filtro, mostrar todos los elementos
    }
  
    return this.floristica.filter(elemento => elemento.nombre.includes(this.filtro)); // Filtrar por el nombre del elemento
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

}



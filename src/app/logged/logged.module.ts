import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MaterialModule } from '../material.module';
import { CatalogoComponent, Viewinformacion } from './components/catalogo/catalogo.component';
import { InformacionComponent } from './components/catalogo/informacion/informacion.component';
import { DashboardComponent, ViewFamilia, ViewOrden, Viewplantas } from './components/dashboard/dashboard.component';
import { DialogComponent } from './components/dashboard/dialog/dialog.component';
import { DialogDeleteComponent } from './components/dashboard/dialogDelete/dialogDelete.component';
import { DialogFamiliaComponent } from './components/dashboard/dialogFamilia/dialogFamilia.component';
import { DialogOrdenComponent } from './components/dashboard/dialogOrden/dialogOrden.component';
import { DialogOrdenEditarComponent } from './components/dashboard/dialogOrden/dialogOrdenEditar.component';
import { DialogOrdenEliminarComponent } from './components/dashboard/dialogOrden/dialogOrdenEliminar.component';
import { MainComponent } from './components/main/main.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { loggedRoutingModule } from './logged-routing.module';






@NgModule({
  declarations: [
    SidenavComponent,
    ToolbarComponent,
    QuienesSomosComponent,
    CatalogoComponent,
    DashboardComponent,
    MainComponent,
    InformacionComponent,
    DialogComponent,
    DialogOrdenComponent,
    DialogFamiliaComponent,
    DialogDeleteComponent,
    DialogOrdenEditarComponent,
    DialogOrdenEliminarComponent,
    ViewOrden,
    ViewFamilia,
    Viewplantas,
    Viewinformacion,
    
  ],
  imports: [
    CommonModule,
    loggedRoutingModule,
    MaterialModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatFormFieldModule,
    FormsModule,
  ],
  exports:[
    MainComponent
  ],
})
export class LoggedModule { }

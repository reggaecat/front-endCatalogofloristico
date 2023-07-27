import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { InformacionComponent } from './components/catalogo/informacion/informacion.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './components/main/main.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';

const routes: Routes = [
    {
        path:'',
        
        children:[{
            path:'catalogo',
            component: CatalogoComponent
        },{
            path: 'quienes',
            component: QuienesSomosComponent
        },{
            path:'dashboard',
            component: DashboardComponent
        },{
            path:'main',
            component: MainComponent
        },{
            path:'informacion',
            component: InformacionComponent
        }]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports:[RouterModule],
    declarations:[],
})
export class loggedRoutingModule{}
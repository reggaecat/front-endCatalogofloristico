import { NgModule } from '@angular/core';
import{Routes, RouterModule} from '@angular/router';

import { CatalogoComponent } from './catalogo.component';
import { InformacionComponent } from './informacion/informacion.component';

const routes: Routes = [
    {
            path:'informacion',
            component: InformacionComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports:[RouterModule],

})
export class loggedRoutingModule{}
import { NgModule } from '@angular/core';
import{Routes, RouterModule} from '@angular/router';
import { MainComponent } from './logged/components/main/main.component';

const routes: Routes = [{
    path:'',loadChildren: () => import('./logged/logged.module').then(x => x.LoggedModule)
    
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule],
    declarations:[],
})
export class appRoutingModule{}
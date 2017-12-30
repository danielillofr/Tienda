import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {EditarComponent} from './components/editar/editar.component';

const app_routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'editar', component: EditarComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const app_routing = RouterModule.forRoot(app_routes);

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule} from '@angular/forms';


import { AppComponent } from './app.component';

import {AngularFireModule} from 'angularfire2';
import {environment} from './../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BarraIntermediaComponent } from './components/barra-intermedia/barra-intermedia.component';

import {ArticulosService} from './services/articulos.service';

import {app_routing} from './app.routes';
import { EditarComponent } from './components/editar/editar.component';
import { SinImagenPipe } from './pipes/sin-imagen.pipe';
import { HomeInfoComponent } from './components/home/home-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    BarraIntermediaComponent,
    EditarComponent,
    SinImagenPipe,
    HomeInfoComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    app_routing
  ],
  providers: [ArticulosService],
  bootstrap: [AppComponent]
})
export class AppModule { }

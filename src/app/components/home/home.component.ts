import { Component, OnInit } from '@angular/core';
import {ArticulosService} from '../../services/articulos.service';
import {articulo,articuloId} from '../../interfaces/articulo.interface';
import * as firebase from "firebase";
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  categorias:string[] = [];
  subCategorias:string[] = [];

  articulos: articuloId[] = [];

  constructor(private _as:ArticulosService,private _rt:Router) {
    _as.getArticulos().subscribe(data=>{
      this.articulos = data;
    });

   }


  Editar_articulos()
  {
    this._rt.navigate(['editar']);
  }

  ngOnInit() {
  }

}

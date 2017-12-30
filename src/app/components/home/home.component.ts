import { Component, OnInit } from '@angular/core';
import {ArticulosService} from '../../services/articulos.service';
import {articulo} from '../../interfaces/articulo.interface';
import * as firebase from "firebase";
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categorias:string[] = [];
  subCategorias:string[] = [];

  art: articulo = {
    ref: "",
    descripcion: "",
    categoria : "",
    urlImagen: "",
    precio: 0,
    disponible: false
  }

  constructor(private _as:ArticulosService,private _rt:Router) {
    this.categorias = _as.getCategorias();
    this.subCategorias = _as.getSubCategorias("Drogueria");
   }

  guardar(){
      this.art.ref = "R002";
      this.art.descripcion= "Descripción articulo 2";
      this.art.categoria= "Juguetes";
      this.art.urlImagen= "";
      this.art.precio= 20;
      this.art.disponible= false;
      this._as.crearArticulo(this.art)
      .then(data=>console.log(data.id));
  }



  Editar_articulos()
  {
    this._rt.navigate(['editar']);
  }

  ngOnInit() {
  }

}

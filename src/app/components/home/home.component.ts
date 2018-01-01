import { Component, OnInit } from '@angular/core';
import {ArticulosService} from '../../services/articulos.service';
import {articulo,articuloId} from '../../interfaces/articulo.interface';
import * as firebase from "firebase";
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  categorias:string[] = [];
  subCategorias:string[] = [];

  articulos: articuloId[] = [];

  categoria:string = "";

  constructor(private _as:ArticulosService,private _rt:Router,_ar:ActivatedRoute) {
    _as.getArticulos().subscribe(data=>{
      this.articulos = data;
    });
    _ar.params.subscribe(params=>{
      if (params["categoria"])
      {
        this.categoria = params["categoria"];
        console.log(this.categoria)
      }else{
        this.categoria = "";
      }
    });

   }


  Editar_articulos()
  {
    this._rt.navigate(['editar']);
  }

  ngOnInit() {
  }

}

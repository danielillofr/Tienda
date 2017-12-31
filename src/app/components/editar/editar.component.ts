import { Component, OnInit } from '@angular/core';
import {ArticulosService} from './../../services/articulos.service';
import {articulo,articuloId} from './../../interfaces/articulo.interface';
import * as firebase from "firebase";


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent implements OnInit {

  articulos:articuloId[] = [];
  articuloEditar:articuloId = null;
  progreso:number = 0;
  uploading:boolean = false;

  categorias: string[] = [];
  subcategorias: string[] = [];


  constructor(private _as:ArticulosService) {
    _as.getArticulos().subscribe(data=>
    {
      this.articulos = data;
      console.log(data);
    });
   }
   Editar_articulo (art:articuloId)
   {
     console.log (`Articulo:${art.id}`);
     this.categorias = this._as.getCategorias();
     this.subcategorias = this._as.getSubCategorias(art.categoria);
     this.articuloEditar = art;
   }

   Nuevo_articulo ()
   {
     let artNuevo:articulo = {
       ref : "",
       titulo: "",
       descripcion: "",
       categoria: "Juguetes",
       subcategoria :"",
       urlImagen: "",
       precio: 0,
       disponible: false
      };
       this._as.crearArticulo(artNuevo)
       .then(data=>{
         console.log(data.id);
         this.articuloEditar = {
           ref : "",
           titulo: "",
           descripcion: "",
           categoria: "Juguetes",
           subcategoria :"",
           urlImagen: "",
           precio: 0,
           disponible: false,
           id : data.id
         };
         this.categorias = this._as.getCategorias();
         this.subcategorias = this._as.getSubCategorias("Juguetes");
       }
     );

     }

   Cambio_categoria()
   {
     console.log("Cambio");
     this.subcategorias = this._as.getSubCategorias(this.articuloEditar.categoria);
   }

   Eliminar()
   {
     this._as.eliminarActa(this.articuloEditar.id);
     this.articuloEditar=null;
   }
  ngOnInit() {
  }

  Subir()
  {
    let ficherito:HTMLInputElement =  <HTMLInputElement>(document.getElementById('fichero'));
    console.log (ficherito.files[0]);
    let uploadTask:firebase.storage.UploadTask = firebase.storage().ref().child(`/imagenes/${ficherito.files[0].name}`).put(ficherito.files[0]);
    this.uploading = true;
    uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
      ( snapshot:any ) => {
        this.progreso = ( snapshot.bytesTransferred / snapshot.totalBytes  ) * 100;
      },
      ( error ) =>
      {
        console.error("Error al subir ", error )}
        ,
      ( )=>{
        console.log(uploadTask.snapshot.downloadURL) ;
        this.articuloEditar.urlImagen = uploadTask.snapshot.downloadURL;
        this.uploading = false;
      }

     )
  }
  Actualizar()
  {
    this._as.actualizarArticulo(this.articuloEditar);
    this.articuloEditar = null;
    console.log(this.articuloEditar);
  }
}

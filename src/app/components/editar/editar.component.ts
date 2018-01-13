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
  articulosFiltrados:articuloId[] = [];
  articuloEditar:articuloId = null;
  progreso:number = 0;
  uploading:boolean = false;

  categorias: string[] = [];
  subcategorias: string[] = [];
  subcategoriasFiltro: string[] = [];

  filtroCategoria:string = "";
  filtroSubcategoria:string="";

  busqueda:string = "";

  paginaActual:number = 0;
  numeroPaginas: number = 0;
  elementosPorPagina:number = 25;

  constructor(private _as:ArticulosService) {
    _as.getArticulos("",0,false).subscribe(data=>{
      this.articulos=data;
      this.categorias = this._as.getCategorias();
      this.Filtrar();
    });
   }

   Cambio_categoriaFiltro()
   {
     console.log(this.filtroCategoria);
     this.subcategoriasFiltro = this._as.getSubCategorias(this.filtroCategoria);
     this.Filtrar();
   }

   Cambio_subCategoriaFiltro()
   {
     this.Filtrar();
   }

   Cambio_busqueda()
   {
     this.Filtrar();
   }

   Filtrar()
   {
     this.articulosFiltrados = [];
     for (let i=0; i < this.articulos.length; i++)
     {
       if(this.filtroCategoria == ""){
         if ((this.articulos[i].titulo.indexOf(this.busqueda)) != -1) this.articulosFiltrados.push(this.articulos[i]);
       }else if (this.filtroCategoria == this.articulos[i].categoria)
       {
         if (this.filtroSubcategoria == "")
         {
           if ((this.articulos[i].titulo.indexOf(this.busqueda)) != -1) this.articulosFiltrados.push(this.articulos[i]);
         }else if (this.filtroSubcategoria == this.articulos[i].subcategoria)
         {
           if ((this.articulos[i].titulo.indexOf(this.busqueda)) != -1)this.articulosFiltrados.push(this.articulos[i]);
         }
       }
     }
     this.numeroPaginas = Math.ceil(this.articulosFiltrados.length / this.elementosPorPagina);
     this.paginaActual = 0;
   }

   Editar_articulo (art:articuloId)
   {
     console.log (`Articulo:${art.id}`);
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
       imagen:"",
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
           categoria: "",
           subcategoria :"",
           imagen:"",
           urlImagen: "",
           precio: 0,
           disponible: false,
           id : data.id
         };
         this.categorias = this._as.getCategorias();
         this.subcategorias = this._as.getSubCategorias("Juguetes");
         if (this.filtroCategoria != "")
         {
           this.articuloEditar.categoria = this.filtroCategoria;
           if (this.filtroSubcategoria != "")
           {
             this.articuloEditar.subcategoria = this.filtroSubcategoria;
           }
         }
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
        this.articuloEditar.imagen = ficherito.files[0].name;
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

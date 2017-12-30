import { Injectable } from '@angular/core';
import {articulo,articuloId} from '../interfaces/articulo.interface';
import { Observable } from 'rxjs/Observable';

import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable()
export class ArticulosService {

  articulos: articulo[] = [];

  articulosObservable : Observable<articuloId[]>;

  constructor(private af: AngularFirestore, public afAuth:AngularFireAuth ) { }

  getArticulos(){
    return this.af.collection<articulo>('articulos').snapshotChanges().map(actions => {
      return actions.map(a => {
       const data = a.payload.doc.data() as articulo;
       const id = a.payload.doc.id;
       return { id, ...data };
     });
   });
  }

  crearArticulo (art:articulo)
  {
      return this.af.collection('articulos').add(art);
  }

  actualizarArticulo(art:articuloId)
  {
    let articuloAct : articulo = {
      ref: art.ref,
      descripcion: art.descripcion,
      categoria:art.categoria,
      urlImagen: art.urlImagen,
      precio: art.precio,
      disponible: art.disponible
    }
    let coleccion:AngularFirestoreCollection<articulo> = this.af.collection<articulo>('articulos');
    let documento: AngularFirestoreDocument<articulo> = coleccion.doc(art.id);
    console.log(articuloAct);
    return documento.set(articuloAct);
  }

  eliminarActa(id:string)
  {

    return this.af.collection('articulos').doc(id).delete();
  }


//CATEGORIAS
  getCategorias (){
    let categorias:string[] = [
      "Juguetes",
      "Drogueria",
      "Menaje",
      "Papeleria",
      "Otros"
    ];
    return categorias;
  }

  getSubCategorias (categoria:string)
  {
    let subCategorias:string[] = [];
    switch(categoria){
      case "Juguetes":{
          subCategorias.push("Jug1");
          subCategorias.push("Jug2");
          subCategorias.push("Jug3");
          subCategorias.push("Jug4");
          subCategorias.push("Jug5");
      }break;
      case "Drogueria":{
          subCategorias.push("Dro1");
          subCategorias.push("Dro2");
          subCategorias.push("Dro3");
          subCategorias.push("Dro4");
          subCategorias.push("Dro5");
      }break;
      case "Menaje":{
          subCategorias.push("Men1");
          subCategorias.push("Men2");
          subCategorias.push("Men3");
          subCategorias.push("Men4");
          subCategorias.push("Men5");
      }break;
      case "Papeleria":{
          subCategorias.push("Pap1");
          subCategorias.push("Pap2");
          subCategorias.push("Pap3");
          subCategorias.push("Pap4");
          subCategorias.push("Pap5");
      }break;
      case "Otros":{
          subCategorias.push("Otr1");
          subCategorias.push("Otr2");
          subCategorias.push("Otr3");
          subCategorias.push("Otr4");
          subCategorias.push("Otr5");
      }break;
    }
    return subCategorias;
  }
}

import { Injectable } from '@angular/core';
import {articulo,articuloId} from '../interfaces/articulo.interface';
import { Observable } from 'rxjs/Observable';

import {DocumentChangeAction, AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Subscription } from 'rxjs/Subscription';


@Injectable()
export class ArticulosService {

  articulos: articulo[] = [];

  articulosObservable : Observable<articuloId[]>;

  elemPorPag: number = 3;

  prevDoc:any;
  lastDoc:any;
  prevDocs:any[] = [];
  showPrev:boolean = false;
  showNext:boolean = false;
  categoria: string = "";

  inicioObs : Observable<DocumentChangeAction[]>;


  constructor(private af: AngularFirestore, public afAuth:AngularFireAuth ) { }

  getArticulos(categoria:string, elemPorPag:number){
    this.articulos = [];
    this.categoria = categoria;
    this.elemPorPag = elemPorPag;
    this.showPrev = false;
    this.showNext = false;
    this.inicioObs = this.af.collection<articulo>('articulos', ref => {
        let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        query = query.orderBy('ref');
        if (categoria != "")
        {
          query = query.where('categoria', '==',categoria);
        }
        if (this.elemPorPag)
        {
          query = query.limit(elemPorPag + 1);//Incrementamos uno para saber que hay más páginas
        }
        return query;
      }).snapshotChanges();

      this.inicioObs.subscribe(data=>{
       if (data.length == (this.elemPorPag + 1))
       {
         this.showNext = true;
         this.lastDoc = data[data.length - 1].payload.doc;
       }
       if (data.length)
       {
         this.prevDoc = data[0].payload.doc;
       }

       // console.log(this.prevDoc.id);
       // console.log(this.lastDoc.id);

       this.articulos = [];

       for (let i = 0; i < data.length; i++)
       {
         if ((this.elemPorPag == 0) || (i < this.elemPorPag))
         {
           const valor = data[i].payload.doc.data() as articulo;
           const id = data[i].payload.doc.id;
           let art:articuloId = {id, ...valor};
           this.articulos.push(art);
         }
       }
      console.log(this.articulos);
    });
  }

  next(){
    this.articulos = [];
    this.showPrev = false;
    this.showNext = false;
    this.af.collection<articulo>('articulos', ref => {
        let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        query = query.orderBy('ref');
        query = query.startAt(this.lastDoc);
        if (this.categoria != "")
        {
          query = query.where('categoria', '==',this.categoria);
        }
        if (this.elemPorPag)
        {
          query = query.limit(this.elemPorPag + 1);//Incrementamos uno para saber que hay más páginas
        }
        return query;
      }).snapshotChanges().subscribe(data=>{
       this.prevDocs.push(this.prevDoc);
       this.showPrev = true;
       if (data.length == (this.elemPorPag + 1))
       {
         this.showNext = true;
         this.lastDoc = data[data.length - 1].payload.doc;
       }
       if (data.length)
       {
         this.prevDoc = data[0].payload.doc;
       }

       console.log(this.prevDoc.id);
       console.log(this.lastDoc.id);

       this.articulos = [];

       for (let i = 0; i < data.length; i++)
       {
         if (i < this.elemPorPag)
         {
           const valor = data[i].payload.doc.data() as articulo;
           const id = data[i].payload.doc.id;
           let art:articuloId = {id, ...valor};
           this.articulos.push(art);
         }
       }
      console.log(this.articulos);
    });
  }

  prev(){
    this.articulos = [];
    this.showPrev = false;
    this.showNext = false;
    this.prevDoc = this.prevDocs[this.prevDocs.length - 1];
    this.af.collection<articulo>('articulos', ref => {
        let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        query = query.orderBy('ref');
        query = query.startAt(this.prevDoc);
        if (this.categoria != "")
        {
          query = query.where('categoria', '==',this.categoria);
        }
        if (this.elemPorPag)
        {
          query = query.limit(this.elemPorPag + 1);//Incrementamos uno para saber que hay más páginas
        }
        return query;
      }).snapshotChanges().subscribe(data=>{
        this.prevDocs.pop();
       if (this.prevDocs.length)
       {
         this.showPrev = true;
       }
       if (data.length == (this.elemPorPag + 1))
       {
         this.showNext = true;
         this.lastDoc = data[data.length - 1].payload.doc;
       }
       if (data.length)
       {
         this.prevDoc = data[0].payload.doc;
       }

       console.log(this.prevDoc.id);
       console.log(this.lastDoc.id);

       this.articulos = [];

       for (let i = 0; i < data.length; i++)
       {
         if (i < this.elemPorPag)
         {
           const valor = data[i].payload.doc.data() as articulo;
           const id = data[i].payload.doc.id;
           let art:articuloId = {id, ...valor};
           this.articulos.push(art);
         }
       }
      console.log(this.articulos);
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
      titulo: art.titulo,
      descripcion: art.descripcion,
      categoria:art.categoria,
      subcategoria:art.subcategoria,
      imagen:art.imagen,
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
          subCategorias.push("Coches");
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
          subCategorias.push("Joyas");
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

import { Pipe, PipeTransform } from '@angular/core';
import {articuloId} from './../interfaces/articulo.interface';

@Pipe({
  name: 'fitroEditar'
})
export class FitroEditarPipe implements PipeTransform {

  transform(articulos: articuloId[], cat: any): articuloId[] {
    let articulosDe:articuloId[] = [];
    for (let i=0; i < articulos.length; i++)
    {
      if(cat.c == ""){
        console.log(articulos[i].titulo.indexOf(cat.b));
        if ((articulos[i].titulo.indexOf(cat.b)) != -1) articulosDe.push(articulos[i]);
      }else if (cat.c == articulos[i].categoria)
      {
        if (cat.s == "")
        {
          articulosDe.push(articulos[i]);
        }else if (cat.s == articulos[i].subcategoria)
        {
          articulosDe.push(articulos[i]);
        }
      }
    }
    console.log(cat);
    return articulosDe;
  }

}

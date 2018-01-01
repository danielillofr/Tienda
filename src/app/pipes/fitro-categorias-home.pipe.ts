import { Pipe, PipeTransform } from '@angular/core';
import {articuloId} from './../interfaces/articulo.interface';

@Pipe({
  name: 'fitroCategoriasHome'
})
export class FitroCategoriasHomePipe implements PipeTransform {

  transform(articulos: articuloId[], categoria:string): articuloId[] {
    let articuloDe:articuloId[] = [];
    for (let i = 0; i < articulos.length; i++)
    {
      if ((categoria == "") || (articulos[i].categoria.toLowerCase() == categoria.toLowerCase()))
      {
        articuloDe.push(articulos[i]);
      }
    }
    return articuloDe;
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import {articuloId} from './../interfaces/articulo.interface';

@Pipe({
  name: 'paginacion'
})
export class PaginacionPipe implements PipeTransform {

  transform(articulos: articuloId[], parametros: any): articuloId[] {
    let inicio:number = parametros.pa * parametros.tp;
    let fin:number =  (parametros.pa + 1) * parametros.tp;
    let respuesta:articuloId[] = [];
    respuesta = articulos.slice(inicio, fin);
    return respuesta;
  }

}

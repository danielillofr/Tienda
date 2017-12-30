export interface articulo
{
  ref: string,
  descripcion: string,
  categoria:string,
  urlImagen: string,
  precio: number,
  disponible: boolean
}

export interface articuloId extends articulo {
  id:string
}

export interface articulo
{
  ref: string,
  titulo: string,
  descripcion: string,
  categoria: string,
  subcategoria: string,
  urlImagen: string,
  precio: number,
  disponible: boolean
}

export interface articuloId extends articulo {
  id:string
}

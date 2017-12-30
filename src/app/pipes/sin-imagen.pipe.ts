import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sinImagen'
})
export class SinImagenPipe implements PipeTransform {

  transform(value: string, uploading:boolean): string {
    if (uploading)
    {
      return 'assets/images/uploading.jpg';
    }
    if (value == "")
    {
      return 'assets/images/noimage.gif';
    }

    return value;
  }

}

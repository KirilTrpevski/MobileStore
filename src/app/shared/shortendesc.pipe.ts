import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'shortendesc'
})
export class ShortenDescPipe implements PipeTransform {
  transform(value: any) {
    if (value.length > 15) {
      return value.substr(0, 50) + '...';
    } else {
      return value;
    }
  }
}

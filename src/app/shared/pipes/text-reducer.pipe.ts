import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'textReducer'
})
export class TextReducerPipe implements PipeTransform {

  transform(value: string, size: number): string {
    return value.substring(0, size) + '...';
  }
}

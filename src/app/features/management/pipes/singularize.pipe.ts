import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'singularize',
})
export class SingularizePipe implements PipeTransform {
  transform(value: string): string {
    const words = value.split(' ');

    for (let index = 0; index < words.length; index++) {
      if (words[index].endsWith('ais')) {
        words[index] = words[index].substring(0, words[index].length - 2) + 'l';
      }

      if (words[index].endsWith('s')) {
        words[index] = words[index].substring(0, words[index].length - 1);
      }
    }

    return words.join(' ');
  }
}

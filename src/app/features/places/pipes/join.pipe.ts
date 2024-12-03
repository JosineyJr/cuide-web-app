import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join',
})
export class JoinPipe implements PipeTransform {
  transform(value: any[], key: string): string {
    if (!value || !Array.isArray(value)) return '';
    return value.map((item) => item[key]).join(', ');
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatFilterValues'
})
export class FormatFilterValuesPipe implements PipeTransform {
  transform(values: (string | number)[]): string {
    if (values.length === 0) {
      return '';
    } else if (values.length === 1) {
      return String(values[0]);
    } else {
      return values.join(' and ');
    }
  }
}

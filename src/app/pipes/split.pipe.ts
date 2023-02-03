import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {
  transform(value: string | number): string {
    return String(value).replace(/-|_/g, ' ');
  }

}

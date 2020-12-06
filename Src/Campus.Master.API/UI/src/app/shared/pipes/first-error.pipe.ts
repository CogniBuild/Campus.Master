import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstError'
})
export class FirstErrorPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {
    if (value) {
      return Object.keys(value)[0];
    }
    return null;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertDashToSpace',
})
export class ConvertDashToSpacePipe implements PipeTransform {
  transform(value: string, character: string): unknown {
    const reg = new RegExp(character, 'g');
    return value.replace(reg, '.');
  }
}

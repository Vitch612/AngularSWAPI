import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hasprop'
})
export class HaspropPipe implements PipeTransform {
  transform(object: object|string, prop: string): boolean {
    if (typeof object=="string") 
      return false;
    else  
      return object.hasOwnProperty(prop);
  }
}
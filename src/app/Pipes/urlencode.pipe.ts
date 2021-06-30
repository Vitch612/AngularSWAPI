import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlencode'
})
export class UrlencodePipe implements PipeTransform {

  transform(value: string): string {
    return encodeURI(value);
  }

}

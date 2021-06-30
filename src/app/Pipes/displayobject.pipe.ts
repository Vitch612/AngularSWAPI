import { Pipe, PipeTransform } from '@angular/core';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Pipe({
  name: 'displayobject'
})
export class DisplayobjectPipe implements PipeTransform {
  transform(value: Object): string {
    let response:string="";
    let prop:keyof Object;
    for(prop in value) {
      if (typeof value[prop] == "string") {
        response+=prop+": "+value[prop]+"\n";
      } else {
        response+=prop+":\n";        
        if (typeof value[prop]=="object") {
          let obj:Object = value[prop];
          let prop2:keyof Object;
          for(prop2 in obj) {
            if (typeof obj[prop2]=="string") {
              response+="  "+obj[prop2]+"\n";
            } else {
              response+="  "+JSON.stringify(obj[prop2])+"\n";
            }
          }
        }
      }
    }
    return response;
  }

}

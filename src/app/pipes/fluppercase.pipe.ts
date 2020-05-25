import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fluppercase'
})
export class FluppercasePipe implements PipeTransform {

  transform(value: string){
    return value[0].toUpperCase() + value.substr(1).toLowerCase()
  }

}

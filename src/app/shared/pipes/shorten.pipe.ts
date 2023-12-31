import { Pipe, PipeTransform } from '@angular/core';
import {max} from "rxjs";

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: string, maxLength : number = 50): string {
    if(value.length >= maxLength){
      return value.substring(0,maxLength) + '...';
    }
    return value;
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import {Action} from '../classes/action';

@Pipe({
  name: 'onlyStepActions'
})
export class OnlyStepActionsPipe implements PipeTransform {

  transform(value: Array<Action>, args?: any): any {
    return value.filter( (action) => action.step);
  }

}

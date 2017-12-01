import { Pipe, PipeTransform } from '@angular/core';
import {ActionHistory} from '../classes/action-history';

@Pipe({
  name: 'actionMessage'
})
export class ActionPipe implements PipeTransform {

  transform(value: ActionHistory, args?: any): any {
    if (value.type === 'Delegate') {
      return `The task was delegated by ${value.creator} to ${value.data.recipient}`;
    } else if (value.type === 'Refinement') {
      return `The task was sent to refinement by ${value.creator} to ${value.data.recipient}`;
    } else if (value.type === 'Done') {
        return `The task completed by ${value.creator}`;
    } else if (value.type === 'Close') {
        return `The task was closed by ${value.creator}`;
    } else  if (value.type === `ReOpen`) {
        return `The task was reopened by ${value.creator}`;
    } else if (value.type === `Cancel`) {
      return `The task was cancelled by ${value.creator}`;
    } else  if (value.type === 'Create') {
      return `The task was created by ${value.creator} and delegated to ${value.data.recipient}`;
    }
    return '';
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'name'
})
export class NamePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (value === 'all') {
      return 'All';
    }
    if (value === 'current') {
      return 'Current';
    }
    if (value === 'created-by-user') {
      return 'Created by user';
    }
    if (value === 'completed') {
      return 'Completed';
    }
    if (value === 'closed') {
      return 'Closed';
    }
    return '';
  }

}

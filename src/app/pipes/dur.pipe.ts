import { Pipe, PipeTransform } from '@angular/core';
import {toString, fromString} from 'durational/lib';
import * as moment from 'moment';

@Pipe({
  name: 'dur'
})
export class DurPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    let dur = moment.duration(value);
    console.log(dur);
    let buf = ' ';
    if (dur.hours() !== 0) {
      buf += ` ${dur.hours()} hours`;
    }
    if (dur.minutes() !== 0) {
      buf += ` ${dur.minutes()} minutes`;
    }
    if (dur.seconds() !== 0) {
      buf += ` ${dur.seconds()} seconds`;
    }
    return  buf;
  }

}

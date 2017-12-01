import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {toString, fromString} from 'durational/lib';
@Component({
  selector: 'app-dur-pick',
  templateUrl: './dur-pick.component.html',
  styleUrls: ['./dur-pick.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DurPickComponent implements OnInit {

  _duration = {
    hours: 0,
    minutes: 5,
    seconds: 0
  };
  hoursChange(val) {
    this._duration.hours = val;
    this.durationChange.emit(toString(this._duration));
  }
  minutesChange(val) {
    this._duration.minutes = val;
    this.durationChange.emit(toString(this._duration));
  }
  secondsChange(val) {
    this._duration.seconds = val;
    this.durationChange.emit(toString(this._duration));
  }
  @Input()
  get duration(){
    return toString(this._duration);
  }
  @Output()
  durationChange = new EventEmitter();
  set duration(val) {
    this._duration = fromString(val);
    this.durationChange.emit(val);
  }
  constructor() { }

  ngOnInit() {
  }

}

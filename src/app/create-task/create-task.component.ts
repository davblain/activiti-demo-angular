import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {TaskService} from '../services/task.service';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';




@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateTaskComponent implements OnInit {
  createTaskForm: FormGroup;
  private searchTerms = new Subject<string>();
  @Output() formSubmitted = new EventEmitter();

  constructor(private userService: UserService, private fb: FormBuilder, private taskService: TaskService) {
    this.createTaskForm = fb.group({
      'recipient': [null, Validators.required],
      'title': [null, Validators.required],
      'description': [null, Validators.required],
      'duration': [null, Validators.required]
    });
  }
  users: Array<string>;
  _duration = 'PT5M';
  private _submitted: boolean;
  valid: boolean;
  _error: boolean;
  ngOnInit() {
    this.searchTerms.asObservable()
      .debounceTime(100)
      .distinctUntilChanged()
      .switchMap((data) => this.userService.userExists(data)).subscribe(exp => {
      this.valid = exp;
    });

  }
  onDurationChange(dur) {
    this.createTaskForm.get('duration').setValue(dur);
    this._duration = dur;
  }
  onChange(data: string): void {
    this.searchTerms.next(data);
  }
  createTask( data: any) {
    this._error = false;
    this.taskService.createTask(data).subscribe(() => {
      this.createTaskForm.reset();
      this.createTaskForm.get('duration').setValue(this._duration);
      this.formSubmitted.emit();
      this.taskService.onCreate.emit();
    },
    (error) => {
        this._error = true;
    });
  }

}

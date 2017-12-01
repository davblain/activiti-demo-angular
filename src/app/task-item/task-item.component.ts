import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TaskService} from '../services/task.service';
import {TaskDetail} from '../classes/task-detail';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {Action} from '../classes/action';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TaskItemComponent implements OnInit {
  taskId;
  doActionForm: FormGroup;
  taskDetail: TaskDetail;
  stepAvailableActions: Array<Action>;
  nonStepAvailableActions: Array<Action>;
  err = false;
  errMessage;
  _selectedAction: Action;
  get selectedAction(){
    return this._selectedAction;
  }
  set selectedAction(value){
    this.doActionForm.get('type').setValue(value.actionType);
    this.doActionForm.setControl('data', this.fb.group({}));
    value.properties.forEach(prop => (this.doActionForm.get('data') as FormGroup).addControl(prop, this.fb.control('')));
    this._selectedAction = value;
  }
  constructor(private taskService: TaskService, private route: ActivatedRoute, private  router: Router, private fb: FormBuilder) {
    this.doActionForm = fb.group({
      'type': [null, Validators.required],
      'data': this.fb.group({})
    });
  }

  ngOnInit() {
    this.route.paramMap.map((params: ParamMap) => {
      return this.taskId = params.get('id');
    }).subscribe((taskId) => this.getTaskData(taskId));
  }
  getTaskData(taskId) {
    return forkJoin(this.taskService.getTaskDetail(taskId), this.taskService.getAvailableActions(taskId)).subscribe((data) => {
        this.taskDetail = data[0];
        this.nonStepAvailableActions = data[1].filter(action => !action.step);
        this.stepAvailableActions = data[1].filter(action => action.step);
        if (this.stepAvailableActions.length !== 0)
        this.selectedAction = this.stepAvailableActions[0];
      },
      (err) => this.router.navigate(['**']));
  }
  textAreaChange(ev) {
    try {
      this.taskDetail = ev.target.value;
    } catch (e) {
      console.info('could not set textarea-value');
    }
  }
  canEditDescription(): boolean {
    return this.nonStepAvailableActions.some(action => action.actionType === 'ChangeDescription');
  }
  changeDescription() {
    this.taskService.updateDescription(this.taskId, this.taskDetail.description).subscribe(
      (data) => this.getTaskData(this.taskId),
      (err: HttpErrorResponse) => {
        if (err.status === 200)
          this.getTaskData(this.taskId);
      });
  }
  onSubmit(data: any) {
    console.log(data);
    this.taskService.doStep(this.taskId, data).subscribe(
      (dataa) => {
        this.getTaskData(this.taskId);
      },
      (err: HttpErrorResponse) => {
      if (err.status === 200)   {
        this.err = false;
        this.getTaskData(this.taskId);
      }
      if (err.error.errorCode === 'Not Found') {
         this.err = true;
         this.errMessage = err.error.errorMessage;

      }

    });
  }

}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {TaskItem} from '../classes/task-item';
import {TaskService} from '../services/task.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {Page} from '../classes/page';
@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TasksListComponent implements OnInit {
  filter;
  pageId;
  sub;
  sub2;
  page: Page;
  constructor(private taskService: TaskService,
              private route: ActivatedRoute,
              private router: Router) {}

  getListOfTasks() {
      this.route.queryParamMap.switchMap((params: ParamMap) => {
          this.filter = params.get('filter');
          this.pageId = params.get('page');
          return this.taskService.getTasksList(params.get('filter'), params.get('page'), params.get('limit'))  ;
      })
        .subscribe((data: Page) => {
          this.page = data;
          console.log(this.page);
    });

  }
  ngOnInit() {
    this.sub = this.getListOfTasks();
    this.sub2 = this.taskService.onCreate.switchMap(() => this.taskService.getTasksList(this.filter, this.pageId, '10'))
      .subscribe(data => {
        this.page = data;
        console.log('created');
      });
  }
  public open(event, item) {
    this.router.navigate(['tasks', item.id]);
  }
  pageChange(event) {
    console.log('navigate');
    this.router.navigate(['tasks'], { queryParams: {
      filter: this.filter,
      page: event,
      limit: 10
    } });
  }
}

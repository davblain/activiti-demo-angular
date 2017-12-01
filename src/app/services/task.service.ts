import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {TaskDetail} from '../classes/task-detail';
import {Page} from '../classes/page';
import {Action} from '../classes/action';
import {AuthorizationService} from "./authorization.service";


@Injectable()
export class TaskService {
  filter = 'all' ;
  onCreate: EventEmitter <void> = new EventEmitter();
  constructor(private http: HttpClient, private  auth: AuthorizationService) { }
  getTasksList(filter: string, page: any, limit: string) {
    let params = new HttpParams();
    if (page != null) {
      params = params.set('page', page);
    }
    if (limit != null) {
      params = params.set('limit', limit);
    }
    return this.http.get(`/api/users/${this.auth.getUsername()}/tasks/${filter}`, {params: params} ) as Observable<Page>;
  }
  createTask(data) {
    return this.http.post('api/tasks', data);
  }
  getTaskDetail (id: string) {
    return this.http.get('api/tasks/' + id) as Observable<TaskDetail>;
  }
  getAvailableActions (id: string) {
    return this.http.get(`api/tasks/${id}/available_actions`) as Observable<Array<Action>>;
  }
  doStep(id: string, action: any) {
    return this.http.post(`api/tasks/${id}/dostep`, action);
  }
  updateDescription( id: string, description: string ) {
    return this.http.put(`api/tasks/${id}`, description);
  }
}


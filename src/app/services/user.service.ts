import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../classes/user';

@Injectable()
export class UserService {
  onGetData: EventEmitter <Array<User>> = new EventEmitter()
  constructor(private http: HttpClient) { }
  getListOfUsers(data): Observable<Array<User>> {
    let params = new HttpParams().set('filter', data);
    return this.http.get('/api/users', {params: params}) as Observable<Array<User>>;
  }
  userExists(data): Observable<boolean> {
    console.log(data);
    return this.getListOfUsers(data).map(users => users.some(user => user.username === data ));
  }
}

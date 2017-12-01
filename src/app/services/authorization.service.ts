import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthorizationService {
  private token = '';
  private username = '';
  constructor(private http: HttpClient) { }
  login(username: string, password: string) {
    return this.http.post('api/login', {username: username, password: password})
      .map( (response) => {
        this.token = response.token;
        this.username = response.username;
        return response;
      });
  }
  getCurrentAuthorization() {
    return this.token;
  }
  getUsername() {
    return this.username;
  }
  logout() {
    this.token = '';
    this.username = '';
  }
}

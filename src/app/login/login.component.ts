import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {AuthorizationService} from '../services/authorization.service';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthorizationService, private route: ActivatedRoute,
              private router: Router) { }
  protected login: string;
  protected password: string;
  protected error: boolean;
  ngOnInit() {
  }
  onClick(e ) {
    this.error = false;
    e.preventDefault();
    this.auth.login(this.login, this.password).subscribe(() => this.router.navigate(['tasks'], { queryParams: {filter: 'all'}}),
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.error = true;
          }
        } );
  }

}

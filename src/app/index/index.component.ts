import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AuthorizationService} from '../services/authorization.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class IndexComponent implements OnInit {
  username = '';
  openedModal: boolean;
  constructor(private auth: AuthorizationService, private router: Router) { }

  ngOnInit() {
    this.username = this.auth.getUsername();
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}

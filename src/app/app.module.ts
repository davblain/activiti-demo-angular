import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {ClarityModule} from 'clarity-angular';
import {RouterModule, Routes} from '@angular/router';
import { IndexComponent } from './index/index.component';
import { TaskItemComponent } from './task-item/task-item.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TaskService} from './services/task.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from './services/user.service';
import { ActionPipe } from './pipes/action.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { DurPickComponent } from './dur-pick/dur-pick.component';
import { DurPipe } from './pipes/dur.pipe';
import { OnlyStepActionsPipe } from './pipes/only-step-actions.pipe';
import { NamePipe } from './pipes/name.pipe';
import {AuthorizationService} from './services/authorization.service';
import {MyHttpInterceptor} from './services/my-http-interceptor';
import {AuthGuard} from './guards/auth.guard';
import {LoginComponent} from './login/login.component';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: IndexComponent, canActivate: [AuthGuard], children: [
    {path: '', redirectTo: '/tasks?filter=all', pathMatch: 'full'},
    {path: 'tasks', component: TasksListComponent},
    {path: 'tasks/:id', component: TaskItemComponent},
    { path: '**', component: PageNotFoundComponent}
  ]
  }
]
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    TaskItemComponent,
    PageNotFoundComponent,
    TasksListComponent,
    CreateTaskComponent,
    ActionPipe,
    DurPickComponent,
    DurPipe,
    OnlyStepActionsPipe,
    NamePipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ClarityModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [TaskService, UserService, AuthorizationService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: MyHttpInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

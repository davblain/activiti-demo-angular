import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {forwardRef, Inject, Injectable, Injector} from '@angular/core';
import {AuthorizationService} from './authorization.service';
@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  private authService: AuthorizationService;
  constructor(private injector: Injector) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthorizationService);
    const authReq = req.clone({headers: req.headers.set('Authorization', this.authService.getCurrentAuthorization())});
    return next.handle(authReq);
  }
}

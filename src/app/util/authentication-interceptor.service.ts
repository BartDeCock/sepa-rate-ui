import {throwError as observableThrowError} from 'rxjs';

import {catchError, switchMap} from 'rxjs/operators';
import {HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {of} from 'rxjs/internal/observable/of';
import {AuthenticationService} from '../user/services/authentication.service';

@Injectable()
export class AuthenticationInterceptorService implements HttpInterceptor {
  isRefreshing = false;

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if ((this.authenticationService.credentials === undefined || this.authenticationService.credentials === null) || this.isRefreshing) {
      return next.handle(req);
    }

    let authenticatedRequest = this.addAuthorizationHeader(req);
    return next.handle(authenticatedRequest).pipe(catchError(
      error => {
        if (error.status === 401) {
          return this.refreshToken()
            .pipe(
              switchMap(() => {
                this.isRefreshing = false;
                authenticatedRequest = this.addAuthorizationHeader(req);
                return next.handle(authenticatedRequest);
              }),
              catchError(() => {
                this.isRefreshing = false;
                this.logout();
                return of();
              })
            );
        } else {
          return observableThrowError(error);
        }
      }
    ));
  }

  private addAuthorizationHeader(req: HttpRequest<any>) {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.authenticationService.credentials.accessToken}`);
    return req.clone({headers: headers});
  }

  private refreshToken() {
    this.isRefreshing = true;
    return this.authenticationService.refreshToken();
  }

  private logout() {
    this.authenticationService.logout();
  }
}


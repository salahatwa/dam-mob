import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { ConfigService } from 'src/app/screens/shared/services/config.service';
import { JwtService } from './jwt.service';


@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService, private router: Router, private config: ConfigService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // YOU CAN ALSO DO THIS
    // const token = this.authenticationService.getToke()
    this.config.cloudSyncing.next(true);

    return from(this.jwtService.getToken())
      .pipe(
        switchMap(token => {
          console.log('>>>>>>>>>' + token);
          if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
          }

          if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
          }

          // if (this.debug) {
          //     request = request.clone({ url: this.url + request.url + '?XDEBUG_SESSION_START=1'});
          // }

          return next.handle(request).pipe(finalize(()=>{
            this.config.cloudSyncing.next(false);
          })).pipe(
            catchError(
              (err, caught) => {
                if (err.status === 401) {
                  this.handleAuthError();
                  return of(err);
                }
                throw err;
              }
            )
          );
        })
      );


  }

  interlcept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      // 'Content-Type': 'application/json',
      // 'Accept': 'application/json',
      // 'Cache-Control': 'no-cache',
      // 'Access-Control-Allow-Origin': '*'
    };

    this.jwtService.getToken().then((token) => {
      console.log('>>>>>>>>>' + token);
      if (token) {
        headersConfig['Authorization'] = `Bearer ${token}`;
      }
    });







    const request = req.clone({ setHeaders: headersConfig, withCredentials: false });

    return next.handle(request).pipe(
      catchError(
        (err, caught) => {
          if (err.status === 401) {
            this.handleAuthError();
            return of(err);
          }
          throw err;
        }
      )
    );
  }
  private handleAuthError() {
    this.jwtService.destroyToken();
    this.router.navigateByUrl('/login');
  }
}

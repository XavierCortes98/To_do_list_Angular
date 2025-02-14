import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = localStorage.getItem('token');

    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(authReq).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            return this.handle401Error(authReq, next);
          }
          return throwError(() => error);
        })
      );
    }

    return next.handle(req);
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((response) => {
          this.isRefreshing = false;
          const newToken = response.token;
          this.refreshTokenSubject.next(newToken);

          localStorage.setItem('token', newToken);
          console.log('reintento');
          return next.handle(
            request.clone({
              setHeaders: { Authorization: `Bearer ${newToken}` },
            })
          );
        }),
        catchError((err) => {
          this.isRefreshing = false;

          this.authService.logout();
          return throwError(() => err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) =>
          next.handle(
            request.clone({
              setHeaders: { Authorization: `Bearer ${token}` },
            })
          )
        )
      );
    }
  }
}

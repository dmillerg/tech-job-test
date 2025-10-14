import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment.development';
import { catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageWatcherService } from '../services/store-watcher.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const storeWatcherService = inject(StorageWatcherService);
  const authService = inject(AuthService);
  const router = inject(Router);

  let accessToken: string | null = null;

  if (isPlatformBrowser(platformId)) {
    const user = JSON.parse(
      sessionStorage.getItem('user') ??
      localStorage.getItem('user') ??
      '{}'
    );

    accessToken = user?.accessToken;
  }

  req = req.clone({
    setHeaders: {
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      'x-ms-authorization-token': environment.authorizationHeader,
    }
  });

  return next(req).pipe(
    catchError(error => {
      if (error.status === 401) {
        return authService.refreshToken().pipe(
          switchMap(value => {
            if (!value) {
              storeWatcherService.logout();
              router.navigate(['auth']);
              return throwError(() => error);
            }
            const isLocalStorage = localStorage.getItem('user') ? true : false;
            storeWatcherService.setUser(JSON.stringify({ accessToken: value.access_token, refreshToken: value.refresh_token }), !isLocalStorage)
            const retriedReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${value.access_token}`,
                'x-ms-authorization-token': environment.authorizationHeader,
              }
            });

            return next(retriedReq);
          }),
          catchError(refreshError => {
            storeWatcherService.logout();
            router.navigate(['auth']);
            return throwError(() => refreshError);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
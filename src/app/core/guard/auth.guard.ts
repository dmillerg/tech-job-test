import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
  ) { }

  canActivate(): boolean | UrlTree {
    const userData = localStorage.getItem('user')|| sessionStorage.getItem('user');
    if (userData) {
      return true;
    }

    return this.router.parseUrl('/auth');
  }
}
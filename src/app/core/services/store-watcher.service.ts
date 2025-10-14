import { Injectable, signal, inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class StorageWatcherService {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  public user = signal<string | null>(this.isBrowser ? this.readUser() : null);

  private readUser(): string | null {
    return localStorage.getItem('user') ?? sessionStorage.getItem('user');
  }

  public setUser(value: string, useSession = false): void {
    if (!this.isBrowser) return;

    if (useSession) {
      sessionStorage.setItem('user', value);
      localStorage.removeItem('user');
    } else {
      localStorage.setItem('user', value);
      sessionStorage.removeItem('user');
    }
    this.user.set(value);
  }

  public logout() {
    this.user.set(null);
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
  }

}
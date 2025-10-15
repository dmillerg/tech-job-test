import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Theme {

  public theme = signal<string>(localStorage.getItem('theme') ?? 'light');

  public setTheme() {
    if (this.theme() === 'dark') {
      this.theme.set('light');
    } else {
      this.theme.set('dark');
    }
    this.changeTheme()
  }

  public changeTheme() {
    localStorage.setItem('theme', this.theme())
    if (this.theme() === 'light') {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }
}

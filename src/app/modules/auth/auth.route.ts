import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadComponent: () => import('./views/login/login').then(e => e.Login) },
    { path: 'register', loadComponent: () => import('./views/register/register').then(e => e.Register) },
    { path: '**', loadComponent: () => import('../not-found/not-found').then(e => e.NotFound) }
];
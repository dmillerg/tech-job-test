import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadComponent: () => import('./views/login/login').then(e => e.Login) },
    { path: 'register', loadComponent: () => import('./views/register/register').then(e => e.Register) },
    { path: 'confirm/:email', loadComponent: () => import('./views/confirm-email/confirm-email').then(e => e.ConfirmEmail) },
    { path: 'reset/:token', loadComponent: () => import('./views/reset-password/reset-password').then(e => e.ResetPassword) },
    { path: '**', loadComponent: () => import('../not-found/not-found').then(e => e.NotFound) }
];
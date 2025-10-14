import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./views/dashboard/dashboard').then(e => e.Dashboard) },
    { path: '**', loadComponent: () => import('../not-found/not-found').then(e => e.NotFound) }
];
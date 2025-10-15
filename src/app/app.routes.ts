import { Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

export const routes: Routes = [
    { path: '', 
        canActivate: [AuthGuard],
         loadChildren: () => import('./modules/home/home.route').then(e => e.routes) },
    { path: 'auth', loadChildren: () => import('./modules/auth/auth.route').then(e => e.routes) },
    { path: '**', loadComponent: () => import('./modules/not-found/not-found').then(e => e.NotFound) }
];

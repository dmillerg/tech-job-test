import { Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: 'auth', loadChildren: () => import('./modules/auth/auth.route').then(e => e.routes) },
    { path: 'dashboard', canActivate: [AuthGuard], loadChildren: () => import('./modules/dashboard/dashboard.route').then(e => e.routes) },
    { path: 'task', canActivate: [AuthGuard], loadChildren: () => import('./modules/task/task.route').then(e => e.routes) },
    { path: '**', loadComponent: () => import('./modules/not-found/not-found').then(e => e.NotFound) }
];

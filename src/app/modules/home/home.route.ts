import { Routes } from '@angular/router';
import { Home } from './views/home/home';

export const routes: Routes = [
    {
        path: '', component: Home, children: [
            { path: '', redirectTo: 'task', pathMatch: 'full' },
            { path: 'dashboard', loadComponent: () => import('./dashboard/views/dashboard/dashboard').then(e => e.Dashboard) },
            { path: 'task', loadChildren: () => import('./task/task.route').then(e => e.routes) }
        ]
    }
];
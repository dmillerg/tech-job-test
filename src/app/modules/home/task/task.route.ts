import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./views/task-list/task-list').then(e => e.TaskList) },
    { path: ':id', loadComponent: () => import('./views/task-detail/task-detail').then(e => e.TaskDetail) },
    { path: '**', loadComponent: () => import('../../not-found/not-found').then(e => e.NotFound) }
];
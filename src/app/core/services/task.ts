import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { of, Observable } from 'rxjs';
import { database } from '../const/db';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  getTask(): Observable<Task[]> {
    return of(database.tasks as any[]);
  }

}

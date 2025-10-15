import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getTask(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks`);
  }

  // addProducto(producto: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/productos`, producto);
  // }

}

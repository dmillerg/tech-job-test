import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { TaskService } from '../../../../../core/services/task';
import { take } from 'rxjs';
import { Task, TaskState } from '../../../../../core/models/task.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [MatButtonModule, MatIconModule, CommonModule, TranslateModule, MatTableModule, MatProgressSpinnerModule, MatSortModule, MatPaginatorModule, DatePipe],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {

  protected taskState = TaskState;

  tasks: Task[] = [];
  displayedColumns: string[] = ['id', 'title', 'description', 'created', 'status', 'actions'];
  dataSource = new MatTableDataSource<Task>([]);

  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private readonly taskService: TaskService
  ) {
    this.getTasks()
  }

  private getTasks() {
    this.isLoadingResults = true;
    this.taskService.getTask().pipe(take(1)).subscribe({
      next: (response: Task[]) => {
        this.tasks = response;
        this.dataSource.data = this.tasks
        this.isLoadingResults = false;
      }, complete: () => this.isLoadingResults = false
    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.dataSource.paginator = this.paginator;

    this.getTasks()
  }
}

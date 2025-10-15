import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, Component, model, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { TaskService } from '../../../../../core/services/task';
import { Task, TaskState } from '../../../../../core/models/task.model';
import { take } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-recent-tasks',
  imports: [MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule, DatePipe, CommonModule, TranslateModule],
  templateUrl: './recent-tasks.html',
  styleUrl: './recent-tasks.css'
})
export class RecentTasks implements AfterViewInit {

  protected taskState = TaskState;

  displayedColumns: string[] = ['id', 'title', 'description', 'created', 'status',];
  data: Task[] = [];
  tasks = model<Task[]>([]);

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private readonly taskService: TaskService
  ) {
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.isLoadingResults = true;
    this.taskService.getTask().pipe(take(1)).subscribe({
      next: (response: Task[]) => {
        setTimeout(() => {
          this.data = response
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5);
          this.isLoadingResults = false;

        }, 3000);
      }, complete: () => this.isLoadingResults = false
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasks']) {
      this.data = this.tasks()
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);
    }
  }
}

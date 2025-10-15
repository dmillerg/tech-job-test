import { Component, effect, inject, ViewChild } from '@angular/core';
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
import { FormBuilder } from '@angular/forms';
import { InputComponent } from '../../../../../shared/components/input/input';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-task-list',
  imports: [MatButtonModule, MatIconModule, CommonModule, TranslateModule, MatTableModule, MatProgressSpinnerModule, MatSortModule, MatPaginatorModule, DatePipe, InputComponent],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {

  protected taskState = TaskState;
  private readonly fb = inject(FormBuilder);
  protected frm = this.fb.group(
    {
      text: [null],
      statu: [null]
    }
  )
  textSignal = toSignal(this.frm.get('text')!.valueChanges, { initialValue: null });
  statuSignal = toSignal(this.frm.get('statu')!.valueChanges, { initialValue: null });

  protected options = [
    { name: TaskState.COMPLETE, value: TaskState.COMPLETE },
    { name: TaskState.PENDING, value: TaskState.PENDING },
    { name: 'task.list.filter.all', value: '' },
  ]

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
    effect(() => {
      const value = this.textSignal();
      const valueStatus = this.statuSignal();
      this.applyFilter(value, valueStatus);
    });

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

  applyFilter(text: string | null, status: string | null) {
    this.dataSource.filterPredicate = (data, filter) => {
      const [textFilter, statusFilter] = filter.split('||').map(f => f.trim().toLowerCase());

      const matchesText = !textFilter || JSON.stringify(data).toLowerCase().includes(textFilter);
      const matchesStatus = !statusFilter || data.state.toLowerCase() === statusFilter;

      return matchesText && matchesStatus;
    };

    const safeText = text ?? '';
    const safeStatus = status ?? '';
    const combinedFilter = `${safeText}||${safeStatus}`;
    this.dataSource.filter = combinedFilter;
  }
}

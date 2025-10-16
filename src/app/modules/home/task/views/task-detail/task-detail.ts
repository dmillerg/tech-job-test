import { Component, inject } from '@angular/core';
import { TaskService } from '../../../../../core/services/task';
import { take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TaskPriority, TaskState } from '../../../../../core/models/task.model';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModal } from '../../components/confirm-modal/confirm-modal';
import { TaskForm } from '../../components/task-form/task-form';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-detail',
  imports: [CommonModule, TranslateModule, MatIconModule, MatButtonModule],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.css'
})
export class TaskDetail {

  task: Task | null = null;
  taskPriority = TaskPriority;
  taskStatus = TaskState;
  dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  constructor(
    private readonly taskService: TaskService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly translate: TranslateService,
  ) {
    this.getTask();
  }

  getTask() {
    const id = this.activatedRoute.snapshot.params['id']
    this.taskService.getTask().pipe(take(1)).subscribe({
      next: (response) => {
        this.task = response.filter(e => e.id === id)[0]
      }
    })
  }

  back() {
    this.router.navigate(['task'])
  }

  changeStatus() {
    this.openSnackBar(this.translate.instant('commons.modal.success'), this.translate.instant('commons.buttons.close'));
    this.task!.state = this.taskStatus.COMPLETE;
  }

  openDialog(data?: Task) {
    const dialogRef = this.dialog.open(TaskForm, {
      data,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.task = result
      }
    });
  }

  openConfirmDelete(data: Task) {
    const dialogRef = this.dialog.open(ConfirmModal, {
      data,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openSnackBar(this.translate.instant('commons.modal.success'), this.translate.instant('commons.buttons.close'));
        this.back()
      }
    })
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}

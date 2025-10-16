import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../../../shared/components/input/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { TaskPriority } from '../../../../../core/models/task.model';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, InputComponent, TranslateModule, MatDialogTitle, MatDialogContent],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm {

  data = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<TaskForm>);
  options = [
    {
      name: TaskPriority.LOW,
      value: TaskPriority.LOW,
    },
    {
      name: TaskPriority.MIDDLE,
      value: TaskPriority.MIDDLE,
    },
    {
      name: TaskPriority.HIGH,
      value: TaskPriority.HIGH,
    }
  ]

  loading: boolean = false;

  private readonly fb = inject(FormBuilder);
  protected frm = this.fb.group({
    id: [],
    title: ['', [Validators.required]],
    description: [''],
    priority: [null, Validators.required],
    createdAt: [],
    createdBy: [],
    note: [''],
    state: ['', [Validators.required]],
  });
  private _snackBar = inject(MatSnackBar);

  constructor(
    private readonly translate: TranslateService
  ) {
    this.frm.patchValue(this.data)
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  protected submit() {
    if(this.frm.invalid) return this.frm.markAllAsTouched();
    this.loading = true;
    setTimeout(() => {
      this.openSnackBar(this.translate.instant('commons.modal.success'), this.translate.instant('commons.buttons.close'));
      this.dialogRef.close(this.frm.value)
    }, 1000);
  }

  protected close() {
    this.dialogRef.close();
  }
}

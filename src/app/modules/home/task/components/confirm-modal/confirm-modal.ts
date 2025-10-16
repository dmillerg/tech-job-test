import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-modal',
  imports: [TranslateModule, MatDialogTitle, MatDialogContent, MatButtonModule],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.css'
})
export class ConfirmModal {

  private _snackBar = inject(MatSnackBar);
  private readonly translate = inject(TranslateService);
  data = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<ConfirmModal>);

  loading: boolean = false;

  protected submit() {
    this.loading = true;
    setTimeout(() => {
      this.openSnackBar(this.translate.instant('commons.modal.success'), this.translate.instant('commons.buttons.close'));
      this.dialogRef.close(true);
    }, 1000);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  protected close() {
    this.dialogRef.close();
  }
}

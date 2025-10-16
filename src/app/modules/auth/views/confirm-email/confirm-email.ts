import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InputComponent } from '../../../../shared/components/input/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../../../core/services/user.service';
import { take } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirm-email',
  imports: [TranslateModule, InputComponent, ReactiveFormsModule, MatCardModule],
  templateUrl: './confirm-email.html',
  styleUrl: './confirm-email.css',
})
export class ConfirmEmail {

  protected loading: boolean = false;
  protected loadingResend: boolean = false;
  protected loadingSubmit: boolean = false;
  private readonly fb = inject(FormBuilder);
  private _snackBar = inject(MatSnackBar);
  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly translate = inject(TranslateService);
  private readonly router = inject(Router);

  protected frm = this.fb.group({
    token: ['', [Validators.required]],
  });

  protected submit() {
    if (this.frm.invalid) this.frm.markAllAsTouched();
    this.loadingSubmit = true;
    this.loading = true;
    const { token } = this.frm.value;
    this.userService.activateUser(token!).pipe(take(1)).subscribe({
      next: () => {
        this.reset();
        this.openSnackBar(this.translate.instant('commons.modal.success'), this.translate.instant('commons.buttons.close'));
        this.router.navigate(['auth']);
      }
    })
  }

  private reset() {
    this.loading = false;
    this.loadingResend = false;
    this.loadingSubmit = false;
  }

  protected sendConfirmationToken() {
    this.loading = true;
    this.loadingResend=true;
    const email = this.activatedRoute.snapshot.params['email'];
    this.authService.sendConfirmationToken(email).pipe(take(1)).subscribe({
      next: () => { 
        this.reset();
        this.openSnackBar(this.translate.instant('auth.confirm.modal.successEmail'), this.translate.instant('commons.buttons.close'));
       },
      error: () => this.loading = false,
      complete: () => this.loading = false,
    })
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}

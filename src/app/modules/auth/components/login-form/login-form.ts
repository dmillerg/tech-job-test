import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InputComponent } from '../../../../shared/components/input/input';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { StorageWatcherService } from '../../../../core/services/store-watcher.service';
import { take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  imports: [TranslateModule, ReactiveFormsModule, InputComponent],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
  providers: [AuthService]
})
export class LoginForm {

  protected loading: boolean = false;
  protected loadingForgot: boolean = false;
  protected noActive = false;
  @Output() navigate = new EventEmitter<boolean>();
  private _snackBar = inject(MatSnackBar);
  private readonly fb = inject(FormBuilder);
  private readonly translate = inject(TranslateService);
  protected frm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(
    private readonly authService: AuthService,
    private readonly storeWatcherService: StorageWatcherService,
    private readonly router: Router
  ) { }

  protected submit() {
    if (this.frm.invalid) this.frm.markAllAsTouched();
    this.loading = true;
    const data = this.frm.value;
    const credential = {
      email: data.email!,
      password: data.password!
    }
    this.authService.login(credential).subscribe({
      next: (response: any) => {
        this.storeWatcherService.setUser(JSON.stringify({ accessToken: response.access_token, refreshToken: response.refresh_token }))
        this.router.navigate(['dashboard'])
      },
      error: (e) => {
        this.noActive = e['status'] === 403;
        this.loading = false;
      }
    }
    );
  }

  protected sendConfirmationToken() {
    this.loading = true;
    const { email } = this.frm.value;
    this.authService.sendConfirmationToken(email!).pipe(take(1)).subscribe({
      next: () => {
        this.loading = false;
        this.openSnackBar(this.translate.instant('auth.confirm.modal.successEmail'), this.translate.instant('commons.buttons.close'));
      },
      error: () => this.loading = false,
      complete: () => this.loading = false,
    })
  }

  protected forgetPassword() {
    if (this.frm.get('email')?.invalid) return this.frm.get('email')?.markAllAsTouched()
    this.loading = true;
    this.loadingForgot = true;
    const { email } = this.frm.value
    this.authService.getTokenChangePassword(email!).pipe(take(1)).subscribe({
      next: () => {
        this.loading = false;
        this.loadingForgot = false;
        this.openSnackBar(this.translate.instant('auth.confirm.modal.successEmail'), this.translate.instant('commons.buttons.close'));
      }, error: () => this.loading = false
    })
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}

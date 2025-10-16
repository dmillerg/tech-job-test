import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { matchPasswordValidator } from '../../../../shared/validators/match-password.validator';
import { take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { InputComponent } from '../../../../shared/components/input/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, MatCardModule, InputComponent, TranslateModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPassword {

  protected loading: boolean = false;
  private _snackBar = inject(MatSnackBar);
  private readonly fb = inject(FormBuilder);
  private readonly translate = inject(TranslateService);
  private readonly router = inject(Router);

  protected frm = this.fb.group({
    password: ['', [Validators.required]],
    confirm: ['', [Validators.required, matchPasswordValidator]],
  });

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthService,
  ) { }

  protected submit() {
    if (this.frm.invalid) return this.frm.markAllAsTouched();
    this.loading = true;
    const token: string = this.activatedRoute.snapshot.params['token'];
    const dataForm = this.frm.value;
    const data = {
      token,
      password: dataForm.password!,
      confirm: dataForm.confirm!
    }
    data.token = token;
    this.authService.changePasword(data).pipe(take(1)).subscribe({
      next: () => {
        this.loading = false;
        this.openSnackBar(this.translate.instant('commons.modal.success'), this.translate.instant('commons.buttons.close'));
        this.router.navigate(['auth'])
      }, error: () => this.loading = false
    })
  }

  protected cancel() {
    this.router.navigate(['auth'])
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}

import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/input/input';
import { TranslateModule } from '@ngx-translate/core';
import { matchPasswordValidator } from '../../../../shared/validators/match-password.validator';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-register-form',
  imports: [InputComponent, TranslateModule, ReactiveFormsModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
  providers: [AuthService]
})
export class RegisterForm {

  private readonly fb = inject(FormBuilder);
  protected frm = this.fb.group({
    avatar: [null],
    phone: [null],
    description: [null],
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirm: ['', [matchPasswordValidator]],
  });
  protected loading: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  protected submit() {
    if (this.frm.invalid) this.frm.markAllAsTouched();
    this.loading = true;
    const data = this.frm.value as any;
    this.authService.register(data).pipe(take(1)).subscribe({
      next: () => this.router.navigate([`auth/confirm/${data.email}`]),
      error: () => this.loading = false,
      complete: () => this.loading = false
    })
  }
}

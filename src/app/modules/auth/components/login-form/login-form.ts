import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputComponent } from '../../../../shared/components/input/input';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [TranslateModule, ReactiveFormsModule, InputComponent],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
  providers: [AuthService]
})
export class LoginForm {

  protected loading: boolean = false;
  private readonly fb = inject(FormBuilder);
  protected frm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(
    private readonly authService: AuthService,
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
      next: () => {
        this.router.navigate(['dashboard']);
      }
    }
    );
  }
}

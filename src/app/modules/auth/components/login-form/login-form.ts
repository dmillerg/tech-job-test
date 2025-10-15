import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputComponent } from '../../../../shared/components/input/input';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { StorageWatcherService } from '../../../../core/services/store-watcher.service';

@Component({
  selector: 'app-login-form',
  imports: [TranslateModule, ReactiveFormsModule, InputComponent],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
  providers: [AuthService]
})
export class LoginForm {

  protected loading: boolean = false;
  @Output() navigate = new EventEmitter<boolean>();
  private readonly fb = inject(FormBuilder);
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
      }
    }
    );
  }
}

import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { InputComponent } from '../../../../shared/components/input/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-confirm-email',
  imports: [TranslateModule, InputComponent, ReactiveFormsModule, MatCardModule],
  templateUrl: './confirm-email.html',
  styleUrl: './confirm-email.css'
})
export class ConfirmEmail {

  protected loading: boolean = false;
  private readonly fb = inject(FormBuilder);
  protected frm = this.fb.group({
    token: ['', [Validators.required]],
  });

  protected submit() {
    if (this.frm.invalid) this.frm.markAllAsTouched();
    this.loading = true;
    const data = this.frm.value;
    // this.authService.login(credential).subscribe({
    //   next: () => {
    //     this.router.navigate(['dashboard']);
    //   }
    // }
    // );
  }
}

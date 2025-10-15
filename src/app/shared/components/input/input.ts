import { Component, Input} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { Options } from '../../../core/models/option.model';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, MatInputModule, TranslateModule, MatSelectModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './input.html',
  styleUrl: './input.css'
})
export class InputComponent {

  @Input({ required: true }) frm!: FormGroup;
  @Input({ required: true }) control!: string;
  @Input() placeholder: string = '';
  @Input() label?: string;
  @Input() hint?: string;
  @Input() type: string = 'text';
  @Input() row: number = 5;
  @Input() optional: boolean = false;
  @Input() options: Options[] = [];
  @Input() tiny: boolean = false;
  @Input() copy?: boolean;


  protected customType: string = this.type;
  protected copied?: string;
  matcher = new MyErrorStateMatcher();

  constructor(
    private readonly translateService: TranslateService
  ) {
  }

  ngOnChanges(): void {
    this.customType = this.type;
  }

  get formControl(){
    return this.frm.get(this.control) as FormControl;
  }

  protected isInvalidAndTouched(controlName: string): boolean {
    const control = this.frm.get(controlName);
    return !!control && control.invalid && control.touched;
  }

  protected getErrorMessage(controlName: string): string | null {
    const control = this.frm.get(controlName);

    if (!control || !control.errors || !control.touched) return null;

    if (control.errors['required']) {
      return this.translateService.instant('inputs.validations.required');
    }

    if (control.errors['minlength']) {
      const { requiredLength, actualLength } = control.errors['minlength'];
      return this.translateService.instant('inputs.validations.minLength', { min: requiredLength });
    }

    if (control.errors['maxlength']) {
      const { requiredLength, actualLength } = control.errors['maxlength'];
      return this.translateService.instant('inputs.validations.maxLength', { max: requiredLength });
    }

    if (control.errors['max']) {
      const { requiredLength, actualLength } = control.errors['max'];
      return this.translateService.instant('inputs.validations.max', { max: requiredLength });
    }

    if (control.errors['min']) {
      const { requiredLength, actualLength } = control.errors['min'];
      return this.translateService.instant('inputs.validations.min', { min: requiredLength });
    }

    if (control.errors['email']) {
      return this.translateService.instant('inputs.validations.invalidEmail');
    }

    if (control.errors['pattern']) {
      return this.translateService.instant('inputs.validations.invalidFormat');
    }

    // Puedes extender aquí con errores personalizados
    if (control.errors['message']) {
      return this.translateService.instant(`inputs.validations.${control.errors['message']}`);
    }

    return this.translateService.instant('inputs.validations.invalidFormat');
  }

  protected changeVisibility() {
    return this.customType === 'password' ? this.customType = 'text' : this.customType = 'password'
  }

  protected copyToClipboard(): void {
    const text = this.frm.get(this.control)?.value
    navigator.clipboard.writeText(text)
      .then(() => {
        this.copied = text;
        setTimeout(() => {
          this.copied = undefined;
        }, 10000);
      })
      .catch(err => {
        console.error('No se pudo copiar:', err);
      });
  }
}

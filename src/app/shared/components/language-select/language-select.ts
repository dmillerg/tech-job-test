import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InputComponent } from '../input/input';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-language-select',
  imports: [ReactiveFormsModule, TranslateModule, InputComponent],
  templateUrl: './language-select.html',
  styleUrl: './language-select.css'
})
export class LanguageSelect {

  private readonly fb = inject(FormBuilder);
  protected frm = this.fb.group({
    language: [localStorage.getItem('language')]
  });
  languageSignal = toSignal(this.frm.get('language')!.valueChanges, { initialValue: localStorage.getItem('language') });

  options = [
    { name: 'ES', value: 'es' },
    { name: 'EN', value: 'en' },
  ]

  constructor(
    private readonly translate: TranslateService
  ) {
    effect(() => {
      const value = this.languageSignal();
      localStorage.setItem('language', value!)
      translate.use(value!)
    });

  }
}

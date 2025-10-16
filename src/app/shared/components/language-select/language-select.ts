import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-language-select',
  imports: [TranslateModule, MatButtonModule, MatMenuModule],
  templateUrl: './language-select.html',
  styleUrl: './language-select.css'
})
export class LanguageSelect {

  protected languageSelected: string = localStorage.getItem('language')?.toUpperCase() ?? 'EN';

  options = [
    { name: 'ES', value: 'es' },
    { name: 'EN', value: 'en' },
  ]

  constructor(
    private readonly translate: TranslateService
  ) {
    const browserLang = navigator.language?.split('-')[0];
    this.languageSelected = localStorage.getItem('language')?.toUpperCase() ?? browserLang.toUpperCase() ?? 'EN';
  }

  setLanguage(language: string) {
    this.languageSelected = language.toUpperCase();
    localStorage.setItem('language', language!)
    this.translate.use(language!)
  }
}

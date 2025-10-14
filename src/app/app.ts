import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('tech-job-test');
  private language: string;

  constructor(
    private readonly translate: TranslateService,
  ) {
    const browserLang = navigator.language?.split('-')[0];
    this.language = localStorage.getItem('language') ?? browserLang ?? 'es';
    this.translate.use('en')
    // this.translate.use(this.language)
  }
}

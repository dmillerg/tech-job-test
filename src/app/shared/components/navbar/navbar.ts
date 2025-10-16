import { Component, EventEmitter, model, Output } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToggleTheme } from '../toggle-theme/toggle-theme';
import { LanguageSelect } from '../language-select/language-select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [MatIconModule, MatSelectModule, MatFormFieldModule, ToggleTheme, LanguageSelect, MatTooltipModule, TranslateModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  user = model<User>();
  @Output() drawer = new EventEmitter<boolean>(false);

  selectedTheme: 'light' | 'dark' = 'light';

  switchTheme(theme: 'light' | 'dark'): void {
    const body = document.body;
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(`${theme}-theme`);
    this.selectedTheme = theme;
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/img/avatar-placeholder.png';
  }

  changeDrawer() {
    this.drawer.emit(true);
  }
}

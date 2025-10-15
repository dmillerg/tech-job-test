import { Component, model } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToggleTheme } from '../toggle-theme/toggle-theme';
import { LanguageSelect } from '../language-select/language-select';

@Component({
  selector: 'app-navbar',
  imports: [MatIconModule, MatSelectModule, MatFormFieldModule, ToggleTheme, LanguageSelect],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  user= model<User>()

  selectedTheme: 'light' | 'dark' = 'light';

switchTheme(theme: 'light' | 'dark'): void {
  const body = document.body;
  body.classList.remove('light-theme', 'dark-theme');
  body.classList.add(`${theme}-theme`);
  this.selectedTheme = theme;
}

}

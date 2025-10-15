import { Component, inject} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Theme } from '../../../core/services/theme';

@Component({
  selector: 'app-toggle-theme',
  imports: [MatIconModule],
  templateUrl: './toggle-theme.html',
  styleUrl: './toggle-theme.css'
})
export class ToggleTheme {

  protected theme= inject(Theme);

  protected setTheme() {
    this.theme.setTheme();
  }
}

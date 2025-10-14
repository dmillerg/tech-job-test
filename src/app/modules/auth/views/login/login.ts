import { Component, model } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../../../../environments/environment.development';
import { User } from '../../../../core/models/user.model';
import { StorageWatcherService } from '../../../../core/services/store-watcher.service';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LoginForm } from '../../components/login-form/login-form';

@Component({
  selector: 'app-login',
  imports: [MatCardModule, MatButtonModule, TranslateModule, LoginForm],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  user = model<User | null>(null);
  error = model<string | null>(null);
  loading = model<string | null>(null);
  loadingProviders = model<boolean>(true);

  constructor(
    private readonly storeWatcherService: StorageWatcherService,
    private readonly router: Router,
  ) { }

  protected handleAuth(provider: string) {
    this.loading.set(provider);
    const width = 600;
    const height = 600;

    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popup = window.open(
      `${environment.back_url}auth/${provider}?state=${environment.authorizationHeader}`,
      'authPopup',
      `width=${width},height=${height},left=${left},top=${top}`
    );

    const backendOrigin = new URL(environment.back_url).origin;

    const popupChecker = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(popupChecker);
        this.loading.set(null);
      }
    }, 500);

    window.addEventListener('message', (event) => {
      if (event.origin !== backendOrigin) return;
      this.storeWatcherService.setUser(JSON.stringify(event.data))
      this.getCredential();
      this.loading.set(null);
      clearInterval(popupChecker);
    });
  }

  private getCredential() {
    this.router.navigate(['dashboard'])
  }
}

import { Component, EventEmitter, model, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../../../environments/environment.development';
import { User } from '../../../../core/models/user.model';
import { StorageWatcherService } from '../../../../core/services/store-watcher.service';

@Component({
  selector: 'app-oauth-provider',
  imports: [TranslateModule],
  templateUrl: './oauth-provider.html',
  styleUrl: './oauth-provider.css'
})
export class OauthProvider {

  user = model<User | null>(null);
  error = model<string | null>(null);
  loading = model<string | null>(null);

  @Output() navigate = new EventEmitter<boolean>();

  constructor(
    private readonly storeWatcherService: StorageWatcherService,
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
      this.loading.set(null);
      this.navigate.emit(true);
      clearInterval(popupChecker);
    });
  }
}

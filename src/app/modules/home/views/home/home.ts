import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Navbar } from '../../../../shared/components/navbar/navbar';
import { User } from '../../../../core/models/user.model';
import { UserService } from '../../../../core/services/user.service';
import { take } from 'rxjs';
import { StorageWatcherService } from '../../../../core/services/store-watcher.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, MatSidenavModule, CommonModule, MatIconModule, Navbar, TranslateModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers: [UserService, StorageWatcherService]
})
export class Home {

  route: string[] = [];
  user!: User;

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly storewatcherService: StorageWatcherService
  ) {
    this.route = this.router.url.split('/');
    this.getUser();
  }

  private getUser() {
    this.userService.findOne().pipe(take(1)).subscribe({
      next: (response) => this.user = response,
      error: () => this.logout()
    })
  }

  protected logout() {
    this.storewatcherService.logout();
    this.router.navigate(['auth'])
  }
}

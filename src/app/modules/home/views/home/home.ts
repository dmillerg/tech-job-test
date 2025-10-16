import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Navbar } from '../../../../shared/components/navbar/navbar';
import { User } from '../../../../core/models/user.model';
import { UserService } from '../../../../core/services/user.service';
import { take } from 'rxjs';
import { StorageWatcherService } from '../../../../core/services/store-watcher.service';
import { TranslateModule } from '@ngx-translate/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-home',
  imports: [RouterOutlet, MatSidenavModule, CommonModule, MatIconModule, Navbar, TranslateModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers: [UserService, StorageWatcherService]
})
export class Home implements AfterViewInit {

  @ViewChild(MatDrawer) drawer!: MatDrawer;
  drawerMode: 'over' | 'side' = 'side';

  route: string[] = [];
  user!: User;

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly storewatcherService: StorageWatcherService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.route = this.router.url.split('/');
    this.getUser();
  }

  ngAfterViewInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        if (result.matches) {
          this.drawerMode = 'over';
          this.drawer.close();
        } else {
          this.drawerMode = 'side';
          this.drawer.open(); 
        }
      });
  }

  protected openCloseSidenav() {
    if (this.drawer.opened) {
      this.drawer.close()
    } else {
      this.drawer.open()
    }
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

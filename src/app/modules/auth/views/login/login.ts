import { Component, model } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LoginForm } from '../../components/login-form/login-form';
import { OauthProvider } from '../../components/oauth-provider/oauth-provider';

@Component({
  selector: 'app-login',
  imports: [MatCardModule, MatButtonModule, TranslateModule, LoginForm, OauthProvider],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(
    private readonly router: Router,
  ) { }

  protected gotoDashboard() {
    this.router.navigate(['dashboard'])
  }
}

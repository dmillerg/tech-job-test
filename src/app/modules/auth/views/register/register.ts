import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { OauthProvider } from '../../components/oauth-provider/oauth-provider';
import { RegisterForm } from '../../components/register-form/register-form';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-register',
  imports: [TranslateModule, OauthProvider, RegisterForm, MatCardModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  constructor(
    private readonly router: Router,
  ) { }

  protected gotoDashboard() {
    this.router.navigate(['dashboard'])
  }
}

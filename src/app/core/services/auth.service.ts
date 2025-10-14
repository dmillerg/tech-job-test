import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly path: string = `${environment.back_url}auth/`
  private http = inject(HttpClient);

  public login(credential: { email: string, password: string }): Observable<User> {
    return this.http.post<User>(`${this.path}login`, credential);
  }

  public refreshToken(): Observable<any> {
    const storage = localStorage.getItem('user') ?? sessionStorage.getItem('user') ?? '{}';
    const refresh_token = JSON.parse(storage)?.refreshToken
    return this.http.post<User>(`${this.path}refresh`, { refresh_token });
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(`${this.path}register`, user);
  }

  public changePasword(data: { password: string, confirm: string, token: string }) {
    return this.http.post(`${this.path}change-password`, data);
  }

  public getTokenChangePassword(email: string) {
    return this.http.post(`${this.path}get-token-change-password/`, { email, callbackUrl: 'http://localhost:4200/auth/change-password' });
  }

  public generatePublicKey(): Observable<{ key: string }> {
    return this.http.get<{ key: string }>(`${this.path}generate-public-key`);
  }

  public sendConfirmationToken(email: string) {
    return this.http.get(`${this.path}send-confirmation-token/${email}`)
  }

  detectCountryFromIP(): Observable<{ country_code: string }> {
    return this.http.get<{ country: string }>('https://api.country.is').pipe(
      map(data => ({ country_code: data.country }))
    );
  }
}

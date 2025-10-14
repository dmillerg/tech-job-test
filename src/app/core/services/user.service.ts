import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  path: string = `${environment.back_url}users/`
  private http = inject(HttpClient);

  public findByEmail(email: string): Observable<User> {
    return this.http.post<User>(`${this.path}find-by-email`, { email });
  }

  public findOne(id?: number): Observable<User> {
    return this.http.get<User>(`${this.path}get-one${id ? '/' + id : ''}`);
  }

  public save(user: User): Observable<User> {
    return this.http.post<User>(`${this.path}create`, user);
  }

  public findPatner(email: string) {
    return this.http.get<User>(`${this.path}find-patner/${email}`);
  }

  public activateUser(token: string) {
    return this.http.get(`${this.path}activate-user/${token}`)
  }

  public update(user: User): Observable<User> {
    return this.http.put<User>(`${this.path}update/${user.id}`, user);
  }

  public searchUser(email: string, companyId?: string): Observable<User[]> {
    return this.http.post<User[]>(`${this.path}search-user`, { email, companyId });
  }


  public getFullDetail(email: string, pages: string[]) {
    return this.http.post<User[]>(`${this.path}full-detail-by-email`, { email, pages });
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, UserResponse, UsersResponse } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);

  public getUsers(page: number): Observable<User[]> {
    const params = new HttpParams().set('page', page.toString());

    return this.http
      .get<UsersResponse>(environment.apiUrl + '/users', { params })
      .pipe(map((response) => response.data));
  }

  public getUser(id: number): Observable<User> {
    return this.http
      .get<UserResponse>(`${environment.apiUrl}/users/${id}`)
      .pipe(map((response) => response.data));
  }

  public updateUser(id: number, changes: Partial<User>) {
    return this.http.put<User>(`${environment.apiUrl}/users/${id}`, changes);
  }
}

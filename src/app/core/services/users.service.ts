import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
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
      .pipe(
        map((response: UsersResponse) => response.data),
        catchError((error) => {
          return throwError(() => new Error('Failed to fetch users', error));
        }),
      );
  }

  public getUser(id: number): Observable<User> {
    return this.http
      .get<UserResponse>(`${environment.apiUrl}/users/${id}`)
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          return throwError(() => new Error('Failed to fetch user', error));
        }),
      );
  }

  public createUser(changes: Partial<User>) {
    return this.http.post<User>(environment.apiUrl + '/users/', changes).pipe(
      catchError((error) => {
        return throwError(() => new Error('Failed to update user', error));
      }),
    );
  }

  public updateUser(id: number, changes: Partial<User>) {
    return this.http
      .put<User>(`${environment.apiUrl}/users/${id}`, changes)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error('Failed to update user', error));
        }),
      );
  }

  public deleteUser(id: number) {
    return this.http.delete<null>(`${environment.apiUrl}/users/${id}444`).pipe(
      catchError((error) => {
        return throwError(() => new Error('Failed to delete user', error));
      }),
    );
  }
}

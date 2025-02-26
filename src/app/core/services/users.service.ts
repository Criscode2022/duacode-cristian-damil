import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);

  public getUsers(page: number): Observable<User[]> {
    return this.http
      .get<{ data: User[] }>(`https://reqres.in/api/users?page=${page ?? 1}`)
      .pipe(map((response) => response.data));
  }

  public getUser(userId: number): Observable<User> {
    return this.http
      .get<{ data: User }>(`https://reqres.in/api/users/${userId}`)
      .pipe(map((response) => response.data));
  }

  public updateUser(userId: number, changes: Partial<User>) {
    return this.http.put<User>(
      `https://reqres.in/api/users/${userId}`,
      changes,
    );
  }
}

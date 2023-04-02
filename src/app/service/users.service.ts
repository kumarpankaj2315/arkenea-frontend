import { Injectable } from '@angular/core';
import { User } from '../users/users';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient, private titleService: Title) {}

  updateTitle(title: string) {
    this.titleService.setTitle(title);
  }

  getUserList(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.apiURL}/user`);
  }

  getUser(id: string): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiURL}/user/${id}`);
  }

  createUser(user: FormData): Observable<User> {
    return this.httpClient.post<User>(
      `${environment.apiURL}/user/create`,
      user
    );
  }

  updateUser(userData: FormData, userId: string): Observable<User> {
    return this.httpClient.put<User>(
      `${environment.apiURL}/user/update/${userId}`,
      userData
    );
  }

  deleteUser(id: string): Observable<User> {
    return this.httpClient.delete<User>(`${environment.apiURL}/user/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { baseURL } from '../../shared/config/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post(baseURL + 'auth', { username, password })
      .pipe(
        map(user => {
          console.log(user)
          if (user && user['token']) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          return user;
        })
      ).toPromise()
  }

  get currentUser() {
    return JSON.parse(localStorage.getItem('currentUser'))
  }

  logout() {
    localStorage.removeItem('currentUser')
  }
}

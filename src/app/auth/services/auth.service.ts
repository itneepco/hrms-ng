import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

import { baseURL } from '../../shared/config/baseUrl';
import { User } from '../../shared/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, 
    private router: Router) {}

  login(emp_code: string, password: string) {
    return this.http.post(baseURL + 'auth/login', { emp_code, password })
      .pipe(
        map(res => {
          console.log(res)
          if (res && res['token']) {
            this.setToken(JSON.stringify(res['token']));
          }
          return res;
        })
      ).toPromise()
  }

  getToken(): string {
    return localStorage.getItem("token");
  }

  setToken(token: string): void {
    localStorage.setItem("token", token);
  }

  isTokenExpired(): boolean {
    const helper = new JwtHelperService();
    let token = this.getToken()
    
    if(!token) return true
    return helper.isTokenExpired(token);
  }

  get currentUser(): User {
    const helper = new JwtHelperService();
    let token = this.getToken()
    
    if(!token) return null
    return helper.decodeToken(token);
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
}

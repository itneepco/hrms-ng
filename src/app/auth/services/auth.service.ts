import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map } from 'rxjs/operators';

import { EL_HPL_ADMIN } from '../../shared/models/global-codes';
import { User } from '../../shared/models/user.model';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { baseURL } from './../../shared/config/baseUrl';
import { HR_LEAVE_SUPER_ADMIN } from './../../shared/models/global-codes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, 
    private handler: ErrorHandlerService,
    private router: Router) {}

  login(emp_code: string, password: string) {
    return this.http.post(baseURL + 'auth/login', { emp_code, password })
      .pipe(
        map(res => {
          if (res && res['token']) {
            this.setToken(JSON.stringify(res['token']));
          }
          return res;
        })
      ).toPromise()
  }

  changePassword(data) {
    return this.http.put(baseURL + 'auth/change-password', data)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
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
    return helper.decodeToken(token)
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

  isItAdmin(): boolean {
    return this.currentUser.role === 1
  }

  isHrSuperAdmin(): boolean {
    return this.currentUser.role === 2
  }

  isHrSiteAdmin(): boolean {
    return this.currentUser.role === 3
  }

  isSuperAdmin(): boolean {
    return this.isItAdmin() || this.isHrSuperAdmin()
  }

  isAdmin(): boolean {
    return  this.isSuperAdmin() || this.isHrSiteAdmin()
  }

  isElHplAdmin(): boolean {
    let role = this.currentUser.roleMapper.find(mapper => mapper.role == EL_HPL_ADMIN)
    return role ? true : false
  }

  isHrLeaveSuperAdmin(): boolean {
    let role = this.currentUser.roleMapper.find(mapper => mapper.role == HR_LEAVE_SUPER_ADMIN)
    return role ? true : false
  }
}

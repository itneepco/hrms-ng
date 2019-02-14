import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map } from 'rxjs/operators';

import { EL_HPL_ADMIN, JWT_TOKEN_NAME, TIME_OFFICE_ADMIN, TRAINING_ADMIN } from '../../shared/models/global-codes';
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
    return localStorage.getItem(JWT_TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(JWT_TOKEN_NAME, token);
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
    localStorage.removeItem(JWT_TOKEN_NAME)
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

  isTimeOfficeAdmin(): boolean {
    let role = this.currentUser.roleMapper.find(mapper => mapper.role == TIME_OFFICE_ADMIN)
    return role ? true : false
  }

  isTrainingAdmin(): boolean {
    let role = this.currentUser.roleMapper.find(mapper => mapper.role == TRAINING_ADMIN)
    return role ? true : false
  }
}

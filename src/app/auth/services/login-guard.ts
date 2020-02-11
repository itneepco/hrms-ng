import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate() {
    if (this.auth.isTokenExpired()) {
      //token is expired, not logged in, so return true
      return true;
    }

    // logged in so do not route to login page, instead redirect to home page
    this.router.navigate(['/']);
    return false;
  }
}
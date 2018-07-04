import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(!this.auth.isTokenExpired()) return true

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
 }
}
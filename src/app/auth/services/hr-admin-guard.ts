import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class HrAdminGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.auth.isHrSiteAdmin() || this.auth.isHrSuperAdmin()) return true
  
    this.router.navigate(['/']);
    return false;
  }
  
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }
}
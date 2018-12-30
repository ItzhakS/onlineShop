import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HomepageService } from './services/homepage.service';
import { Configuration } from './services/configuration';
import { useAnimation } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdGuard implements CanActivate {

  get user(){ return this.config.user}
  constructor(
    private router: Router,
    public config: Configuration
    ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (localStorage.getItem('token') && this.user.role >0) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['../home'], { queryParams: { returnUrl: state.url }});
        return false;
  }
}


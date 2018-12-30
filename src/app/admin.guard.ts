import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Configuration } from './services/configuration';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  get user(){ return this.config.user}
  constructor(
    private router: Router,
    public config: Configuration
    ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(!this.user) {
        this.router.navigate(['../home'], { queryParams: { returnUrl: state.url }});
        return false;
      }
    if(this.user.role !== 0){
      this.router.navigate(['../home'], { queryParams: { returnUrl: state.url }});
      return false;
    } 
    else return true;
  }
}

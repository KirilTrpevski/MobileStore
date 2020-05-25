import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot):
    boolean | Promise<boolean> | Observable<boolean | UrlTree> | UrlTree {
    return this.authService.admin.pipe(
      take(1),
      map((user) => {
        const isAuth = !!user;
        if (user) {
          return true;
        }
        return this.router.createUrlTree(['/mobile-admin']);
      }));
  }

}

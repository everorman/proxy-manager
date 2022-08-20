import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService, TokenStorageService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) { }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean | Observable<boolean> {
    return this.authService.getCurrentUserDetail()
      .then((result) => {
        if (!result) {
          this.tokenStorage.cleanUser();
          this.router.navigateByUrl('/login');
          return false;
        }

        const user = {};
        this.tokenStorage.saveUser(result);

        return true;
      })
      .catch((err) => {
        console.log('Error profile')
        this.tokenStorage.cleanUser();
        this.router.navigateByUrl('/login');
        return false;
      })
  }

  public canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean | Promise<boolean> {
    return this.canActivate(route, state);
  }
}

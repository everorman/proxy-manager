import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProxyService } from '../services/proxy/proxy.service';

@Injectable({
  providedIn: 'root'
})
export class ProxyAdminListResolver implements Resolve<boolean> {
  constructor(private proxyService: ProxyService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return of(true);
  }
}

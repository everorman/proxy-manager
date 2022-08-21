import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { ProxyType } from '../components/proxy/proxy.type';
import { ProxyService } from '../services/proxy/proxy.service';
import { PaginationRequestType } from '../types';

@Injectable({
  providedIn: 'root'
})
export class ProxyListResolver implements Resolve<PaginationRequestType<ProxyType>> {
  constructor(private proxyService: ProxyService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<PaginationRequestType<ProxyType>> {
    return this.proxyService.getItems();
  }
}

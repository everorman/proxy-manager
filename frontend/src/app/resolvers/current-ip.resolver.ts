import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PageService } from '../services/page/page.service';
import { CurrentIpType } from '../types';

@Injectable({
  providedIn: 'root'
})
export class CurrentIPResolver implements Resolve<CurrentIpType> {
  constructor(private pageService: PageService) {}

  resolve(): Observable<CurrentIpType> {
    return this.pageService.currentIp();
  }
}

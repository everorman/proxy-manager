import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { PaginationRequestType } from '../../types';
import { UserType } from '../authenticated/types';


@Injectable({
  providedIn: 'root'
})
export class UserListResolver implements Resolve<PaginationRequestType<UserType>> {
  constructor(private userService: UserService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<PaginationRequestType<UserType>> {
    return new Promise(()=>[]);
  }
}

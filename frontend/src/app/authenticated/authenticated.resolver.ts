import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { UserType } from './types';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedResolver implements Resolve<UserType> {
  constructor(private authService: AuthService) {}

  resolve(): Promise<UserType> {
    return this.authService.getCurrentUserDetail();
  }
}
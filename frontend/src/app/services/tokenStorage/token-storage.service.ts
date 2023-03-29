import { Injectable } from '@angular/core';
import { UserType } from '../../types/authenticated.type';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const EXPIRES_AT = 'expires-at';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }
  signOut(): void {
    localStorage.clear();
  }
  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }
  public saveExpiresAt(expiresAt: string): void {
    localStorage.removeItem(EXPIRES_AT);
    localStorage.setItem(EXPIRES_AT, expiresAt);
  }
  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
  public getExpiresAt(): string | null {
    return localStorage.getItem(EXPIRES_AT);
  }
  public saveUser(user: UserType): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public cleanUser(){
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }
  public getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}

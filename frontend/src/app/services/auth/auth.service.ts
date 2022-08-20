import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserType } from 'src/app/components/authenticated/types';
import { AuthJwtType, UserRegisterType } from 'src/app/types';
import { environment } from 'src/environments/environment';
import { StatusRequestType } from '../../types';
import { TokenStorageService } from '../tokenStorage/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers = new HttpHeaders({
    // 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    responseType: 'text',
    // 'Access-Control-Allow-Headers': 'Content-Type',
    // 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    // 'Authorization': 'Bearer szdp79a2kz4wh4frjzuqu4sz6qeth8m3',
  });

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private tokenStorage: TokenStorageService,
  ) { }

  async signUp(form: UserRegisterType) {
    const host = `${environment.apiHost}/auth/register`;
    this.spinner.show();
    try {
      const result = await this.http.post<UserRegisterType>(host, form, { headers: this.headers }).toPromise();
      console.log(result)
      this.spinner.hide();
      return result;
    } catch (err) {
      console.log(err)
      this.spinner.hide();
      throw new Error();
    }
    
    

  }

  async signIn(email: string, password: string) {
    const host = `${environment.apiHost}/auth/login`;
    this.spinner.show();
    try {
      const result = await this.http.post<StatusRequestType>(host, { email, password }).toPromise();
      if (result.data) {
        this.setSession((result.data as AuthJwtType));
      }
      this.spinner.hide();
      return result;
    } catch (error: any) {
      console.error("Error al iniciar sesion", error);
      this.spinner.hide();
      return { error: error.error };
    }

  }

  async getCurrentUserDetail(): Promise<UserType | null> {
    const host = `${environment.apiHost}/user/profile`;
    this.spinner.show();
    try {
      const result = await this.http.post<UserType>(host, { headers: this.headers }).toPromise();
      this.spinner.hide();
      return result;
    } catch (err: any) {
      console.log('err', err);
      this.spinner.hide();
      return null;
    };





  }

  private setSession(authResult: AuthJwtType) {
    this.tokenStorage.saveToken(authResult.accesToken);
    this.tokenStorage.saveExpiresAt(authResult.expiresIn);
  }

  logout() {
    // localStorage.removeItem("id_token");
    // localStorage.removeItem("expires_at");
    this.tokenStorage.cleanUser();
  }

  public isLoggedIn() {
    return this.tokenStorage.getToken();
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = this.tokenStorage.getExpiresAt() || '';
    console.log(expiration);
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

}

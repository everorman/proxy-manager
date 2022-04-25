import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { UserType } from 'src/app/authenticated/types';
import { AuthJwtType, UserRegisterType } from 'src/app/types';
import { environment } from 'src/environments/environment';
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
    private tokenStorage:TokenStorageService
    ) { }

  async signUp(form: UserRegisterType) {
    const host = `${environment.apiHost}/auth/register`;
    this.spinner.show();
    try {
      const result = await this.http.post<UserRegisterType>(host, form, { headers: this.headers }).toPromise();
      console.log(result)
      return result;
    } catch (err) {
      console.log(err)
      throw new Error();
    } finally {
      this.spinner.hide();
    }

  }

  async signIn(email: string, password: string) {
    const host = `${environment.apiHost}/auth/login`;
    this.spinner.show();
    try {
      const result = await this.http.post<AuthJwtType>(host, { email, password }).toPromise();
      this.setSession(result);
      return result;
    } catch (error) {
      console.error("Error al iniciar sesion", error);
      throw new Error();
    } finally {
      this.spinner.hide();
    }

  }

  async getCurrentUserDetail(): Promise<UserType>{
    const host = `${environment.apiHost}/user/profile`;
    this.spinner.show();
    try {
      const result = await this.http.post<UserType>(host, { headers: this.headers }).toPromise();
      console.log(result)
      return result;
    } catch (err) {
      console.log(err)
      throw new Error();
    } finally {
      this.spinner.hide();
    }
  }

  private setSession(authResult: AuthJwtType) {
    this.tokenStorage.saveToken(authResult.accesToken);
  }

  logout() {
    // localStorage.removeItem("id_token");
    // localStorage.removeItem("expires_at");
    this.tokenStorage.cleanUser();
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = this.tokenStorage.getExpiresAt() || '';
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

}

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { UserType } from 'src/app/components/authenticated/types';
import { AuthJwtType, UserRegisterType } from 'src/app/types';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../tokenStorage/token-storage.service';
import { StatusRequestType } from '../../types';

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
    private tokenStorage: TokenStorageService
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
      const result = await this.http.post<StatusRequestType>(host, { email, password }).toPromise();
      if (result.data) {
        this.setSession((result.data as AuthJwtType));
      }
      return result;
    } catch (error: any) {
      console.error("Error al iniciar sesion", error);
      return { error: error.error};
    } finally {
      this.spinner.hide();
    }

  }

  async getCurrentUserDetail(): Promise<UserType> {
    const host = `${environment.apiHost}/user/profile`;
    this.spinner.show();
    const result = await this.http.post<UserType>(host, { headers: this.headers }).toPromise();
    this.spinner.hide();
    return result;
  
    
    
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

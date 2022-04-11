import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserType } from 'src/app/types';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

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

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  async signUp(form: UserType){
    const host = `${environment.apiHost}/auth/register`;
    this.spinner.show();
    try{
      const result = await this.http.post<UserType>(host, form, { headers: this.headers }).toPromise();
      console.log(result)
      return result;
    }catch(err){
      console.log(err)
      throw new Error();
    }finally{
      this.spinner.hide();
    }
    
  }

}

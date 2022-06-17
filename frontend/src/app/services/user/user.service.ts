import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private headers = new HttpHeaders({
    // 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Headers': 'Content-Type',
    // 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    // 'Authorization': 'Bearer szdp79a2kz4wh4frjzuqu4sz6qeth8m3',
  });
  constructor(private http: HttpClient,) { }

  search(key: string) {
    const host = `${environment.apiHost}/user/search/${key}`;
    return this.http.get(host, { headers: this.headers });
  }
}

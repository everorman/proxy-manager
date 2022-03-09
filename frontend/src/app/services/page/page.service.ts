import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageType } from 'src/app/types';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  headers = new HttpHeaders({
    // 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Headers': 'Content-Type',
    // 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    // 'Authorization': 'Bearer szdp79a2kz4wh4frjzuqu4sz6qeth8m3',
  });

  constructor(private http: HttpClient) { }
  async addItem(form: PageType) {
    const url = 'http://localhost:3000/pages';
    const item = await this.http.post<PageType>(url, form, { headers: this.headers }).toPromise();
    console.log(item)
    return item;
  }

  async getItems(): Promise<PageType[]> {
    const url = 'http://localhost:3000/pages';
    const items = await this.http.get<PageType[]>(url, { headers: this.headers }).toPromise();
    console.log(items)
    return items;
  }

  async currentIp(){
    const url = 'https://api.ipgeolocation.io/getip';
    const item = await this.http.get<{ ip: string; }>(url).toPromise();
    console.log(item)
    return item;
  }
}

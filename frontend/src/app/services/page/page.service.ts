import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentIpType, PageType } from 'src/app/types';

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
    const host = `https://ssiproxy.alwaysdata.net/sites`;
    const item = await this.http.post<PageType>(host, form, { headers: this.headers }).toPromise();
    console.log(item)
    return item;
  }

  async getItems(): Promise<PageType[]> {
    const url = 'http://localhost:3000/pages';
    const items = await this.http.get<PageType[]>(url, { headers: this.headers }).toPromise();
    console.log(items)
    return items;
  }

  currentIp(){
    console.log('Aqui estoy')
    const url = 'https://api.ipgeolocation.io/getip';
    return this.http.get<CurrentIpType>(url);
  
  }

  getIpDetails(ip: string):Promise<PageType>{
    const host = `https://ssiproxy.alwaysdata.net/sitesCheck/${ip}`;
    return this.http.get<PageType>(host, {headers: this.headers}).toPromise();
  }
}

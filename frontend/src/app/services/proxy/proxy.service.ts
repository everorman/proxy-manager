import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProxyType } from 'src/app/components/proxy/proxy.type';
import { PaginationRequestType, CurrentIpType } from 'src/app/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProxyService {

  headers = new HttpHeaders({
    // 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Headers': 'Content-Type',
    // 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    // 'Authorization': 'Bearer szdp79a2kz4wh4frjzuqu4sz6qeth8m3',
  });

  constructor(private http: HttpClient) { }
  
  async addItem(form: ProxyType) {
    const host = `${environment.apiHost}/proxy/add`;
    const item = await this.http.post<ProxyType>(host, form, { headers: this.headers }).toPromise();
    return item;
  }

  async getItems(page: number = 1): Promise<PaginationRequestType<ProxyType>> {
    const url = `${environment.apiHost}/proxy/list`;
    const items = await this.http.post<PaginationRequestType<ProxyType>>(url, { page }, { headers: this.headers }).toPromise();
    console.log(items);
    return items;
  }





}

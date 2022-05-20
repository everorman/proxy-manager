import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentIpType, PageType, PaginationRequestType } from 'src/app/types';
import { environment } from 'src/environments/environment';

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
    const host = `${environment.apiHost}/sites/add`;
    const item = await this.http.post<PageType>(host, form, { headers: this.headers }).toPromise();
    return item;
  }

  async getItems(page: number = 1): Promise<PaginationRequestType> {
    const url = `${environment.apiHost}/sites`;
    const items = await this.http.post<PaginationRequestType>(url, { page }, { headers: this.headers }).toPromise();
    return items;
  }

  async seachIp(page: number = 1, seachText: string = ''): Promise<PaginationRequestType> {
    const url = `${environment.apiHost}/sites`;
    const items = await this.http.post<PaginationRequestType>(url, { page, seachText }, { headers: this.headers }).toPromise();
    return items;
  }

  async getSite(ip: string): Promise<PageType> {
    const url = `${environment.apiHost}/siteByIp/${ip}`;
    const item = await this.http.get<PageType>(url, { headers: this.headers }).toPromise();

    return item;
  }

  async updateSite(form: PageType): Promise<PageType> {
    const url = `${environment.apiHost}/site/update`;
    const item = await this.http.post<PageType>(url, form, { headers: this.headers }).toPromise();

    return item;
  }

  currentIp() {
    const url = 'https://api.ipgeolocation.io/getip';
    return this.http.get<CurrentIpType>(url);

  }

  getIpDetails(ip: string): Promise<PageType> {
    const host = `${environment.apiHost}/sitesCheck/${ip}`;
    return this.http.get<PageType>(host, { headers: this.headers }).toPromise();
  }
}

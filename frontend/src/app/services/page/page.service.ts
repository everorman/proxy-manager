import { Injectable } from '@angular/core';
import { PageType } from 'src/app/types';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor() { }
  addItem(form: PageType){}
  getItems(){
    return [];
  }
}

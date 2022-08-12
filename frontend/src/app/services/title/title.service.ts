import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  private titleBehavior = new BehaviorSubject<string>('');

  title$ = this.titleBehavior.asObservable();

  constructor() { }

  updateTitle(title:string) {
    console.log('Se actualiza title', title);
    this.titleBehavior.next(title);
  }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertType } from 'src/app/types';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  private alerts:AlertType[] = [];
  private alertsBehavior = new BehaviorSubject<AlertType[]>([]);

  alerts$ = this.alertsBehavior.asObservable();

  constructor() { }

  addAlert(alert:AlertType) {
    this.alerts.push(alert);
    this.alertsBehavior.next(this.alerts);
  }

}

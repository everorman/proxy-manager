import { Component, OnInit } from '@angular/core';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { AlertsService } from 'src/app/services/alerts/alerts.service';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.scss']
})
export class AuthenticatedComponent implements OnInit {

  constructor(private alertsService: AlertsService) { }
  alerts$ = this.alertsService.alerts$;

  ngOnInit(): void {
  }

}

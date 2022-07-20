import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { ProxyService } from 'src/app/services/proxy/proxy.service';
import { ProxyType } from '../proxy.type';

@Component({
  selector: 'app-proxy-item',
  templateUrl: './proxy-item.component.html',
  styleUrls: ['./proxy-item.component.scss'],
})
export class ProxyItemComponent implements OnInit {
  @Input() item!: ProxyType;

  constructor(
    private route: ActivatedRoute,
    private proxyService: ProxyService,
    private spinner: NgxSpinnerService,
    private alertsService: AlertsService
  ) {}

  ngOnInit() {}

  async resetHost(host: ProxyType) {
    this.spinner.show();
    this.proxyService
      .reset(host)
      .then((result) => {
        // emit success event
      })
      .catch((err) => {
        // emit error event
      });
    //mostrar de estatus de reset
    this.spinner.hide();
  }
}

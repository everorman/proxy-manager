import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProxyService } from 'src/app/services/proxy/proxy.service';
import { PaginationRequestType } from 'src/app/types';
import { ProxyType } from '../proxy.type';

@Component({
  selector: 'app-proxy-dashboard',
  templateUrl: './proxy-dashboard.component.html',
  styleUrls: ['./proxy-dashboard.component.scss']
})
export class ProxyDashboardComponent implements OnInit {
  proxyList!: PaginationRequestType<ProxyType>;
  currentPage: number = 0;
  alerts: any[] = [];
  private alertDuration = 5000;

  constructor(private route: ActivatedRoute, private proxyService: ProxyService, private spinner: NgxSpinnerService,) { }

  ngOnInit() {
    this.proxyList = this.route.snapshot.data.list;
    console.log(this.proxyList);
  }

  async pageChanged(event: PageChangedEvent) {
    this.spinner.show();
    this.proxyList = await this.proxyService.getItems(event.page);
    this.spinner.hide();
  }

  async resetHost(host:ProxyType){
    this.spinner.show();
    this.proxyService.reset(host)
    .then((result) => {
      console.log('resetHost',result);
      this.alerts.push({
        type: 'success',
        msg: `Proxy updated successfully`,
        timeout: this.alertDuration
      });
    })
    .catch((err) => {
      this.alerts.push({
        type: 'danger',
        msg: `Error registering proxy: ${err.message}`,
        timeout: this.alertDuration
      });
      console.log('resetHost',err);
    })
    //mostrar de estatus de reset
    this.spinner.hide();
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

}
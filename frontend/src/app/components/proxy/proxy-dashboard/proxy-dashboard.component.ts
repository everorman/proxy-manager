import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

}

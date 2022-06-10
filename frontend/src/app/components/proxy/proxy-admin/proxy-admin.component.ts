import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProxyService } from 'src/app/services/proxy/proxy.service';
import { PaginationRequestType } from 'src/app/types';
import { ProxyType } from '../proxy.type';

@Component({
  selector: 'app-proxy-admin',
  templateUrl: './proxy-admin.component.html',
  styleUrls: ['./proxy-admin.component.scss'],
})
export class ProxyAdminComponent implements OnInit {
  proxyList!: PaginationRequestType<ProxyType>;
  currentPage: number = 0;
  modalRef!: BsModalRef;
  itemForm!: FormGroup;
  alerts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private proxyService: ProxyService,
    private modalService: BsModalService
  ) {
    this.itemForm = new FormGroup({
      ip: new FormControl(''),
      description: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.proxyList = this.route.snapshot.data.list;
    console.log(this.proxyList);
  }

  async pageChanged(event: PageChangedEvent) {
    this.spinner.show();
    this.proxyList = await this.proxyService.getItems(event.page);
    this.spinner.hide();
  }

  openAdd(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  async addItem() {
    if(this.itemForm.invalid) {
      this.alerts.push({
        type: 'danger',
        msg: `Check the form fields`,
        timeout: 3000
      });
      return;
    }
    this.spinner.show;
    this.modalRef.hide();
    this.proxyService.addItem(this.itemForm.value)
    .then((result) => {
      this.alerts.push({
        type: 'success',
        msg: `Proxy registered successfully`,
        timeout: 3000
      });
    })
    .catch((err) => {
      this.alerts.push({
        type: 'danger',
        msg: `Error registering proxy: ${err.message}`,
        timeout: 3000
      });
    })
    .finally(() => {
      this.spinner.hide();
    })
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  search(email: string) {
    if (email) {
      console.log(email);
    }
  }
}

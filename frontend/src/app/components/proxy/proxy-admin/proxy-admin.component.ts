import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  proxyForm!: FormGroup;
  alerts: any[] = [];

  private alertDuration = 5000;

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private proxyService: ProxyService,
    private modalService: BsModalService
  ) {
    this.proxyForm = new FormGroup({
      host: new FormControl('', [Validators.required, Validators.minLength(4)]),
      description: new FormControl(''),
      owner: new FormControl(''),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      status: new FormControl('', [Validators.required, Validators.minLength(4)])
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
    if(this.proxyForm.invalid) {
      this.alerts.push({
        type: 'danger',
        msg: `Check the form fields`,
        timeout: this.alertDuration
      });
      return;
    }
    this.spinner.show;
    
    this.proxyService.addItem(this.proxyForm.value)
    .then(async (result) => {
      this.alerts.push({
        type: 'success',
        msg: `Proxy registered successfully`,
        timeout: this.alertDuration
      });
      this.modalRef.hide();
      this.proxyForm.reset();
      this.proxyList = await this.proxyService.getItems();
    })
    .catch((err) => {
      this.alerts.push({
        type: 'danger',
        msg: `Error registering proxy: ${err.message}`,
        timeout: this.alertDuration
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

  onStatusChange(proxy:ProxyType) {
    this.spinner.show;
    this.proxyService.updateItem(proxy)
    .then(() => {
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
      console.log(err);
    })
    .finally(() => {
      this.spinner.hide();
    })
  }
}

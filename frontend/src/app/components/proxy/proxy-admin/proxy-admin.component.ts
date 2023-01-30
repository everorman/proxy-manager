import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { ProxyService } from 'src/app/services/proxy/proxy.service';
import { UserService } from 'src/app/services/user/user.service';
import { PaginationRequestType } from 'src/app/types';
import { SearchUserType } from '../../searchUser/searchUser.type';
import { ProxyType } from '../proxy.type';

@Component({
  selector: 'app-proxy-admin',
  templateUrl: './proxy-admin.component.html',
  styleUrls: ['./proxy-admin.component.scss'],
})
export class ProxyAdminComponent implements OnInit, OnDestroy {
  proxyList!: PaginationRequestType<ProxyType>;
  currentPage: number = 0;
  modalRef!: BsModalRef;

  proxyForm: UntypedFormGroup = new UntypedFormGroup({
    host: new UntypedFormControl('', [Validators.required, Validators.minLength(4)]),
    urlReset: new UntypedFormControl('', [Validators.required, Validators.minLength(4)]),
    description: new UntypedFormControl(''),
    userId: new UntypedFormControl(''),
    hostUser: new UntypedFormControl(''),
    hostPassword: new UntypedFormControl('', [Validators.required, Validators.minLength(4)]),
    status: new UntypedFormControl('', [Validators.required, Validators.minLength(4)])
  });
  subscription!: Subscription;
  subscriptionSearch!: Subscription | undefined;
  users: SearchUserType[] = [];
  searchForm = new UntypedFormGroup({
    key: new UntypedFormControl(''),
  })

  
  alerts: any[] = [];

  private alertDuration = 5000;

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private proxyService: ProxyService,
    private modalService: BsModalService,
    private userService: UserService,
    private alertsService: AlertsService
  ) {
    this.proxyForm.get
  }

  ngOnInit(): void {
    this.subscriptionSearch = this.searchForm.get("key")?.valueChanges.subscribe(selectedValue => {
      this.searchUser(selectedValue);

    })
    
    this.proxyList = this.route.snapshot.data.list;
    console.log(this.proxyList);
  }

  searchUser(key:string) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.userService.search(key)
      .subscribe((res) => {
        this.users = (res as SearchUserType[]);
      })
  }

  getControl(name: string) {
    return this.proxyForm.get(name) as UntypedFormControl;
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
      this.alertsService.addAlert({
        type: 'danger',
        msg: `Check the form fields`,
        timeout: this.alertDuration
      })
      return;
    }
    console.log(this.proxyForm.value);
    this.spinner.show();
    
    this.proxyService.addItem(this.proxyForm.value)
    .then(async (result) => {

      this.alertsService.addAlert({
        type: 'success',
        msg: `Proxy registered successfully`,
        timeout: this.alertDuration
      })
      this.modalRef.hide();
      this.proxyForm.reset();
      this.searchForm.reset();
      this.proxyList = await this.proxyService.getItems();
    })
    .catch((err) => {
      this.alertsService.addAlert({
        type: 'danger',
        msg: `Error registering proxy: ${err.message}`,
        timeout: this.alertDuration
      })
    })
    .finally(() => {
      this.spinner.hide();
    })
  }

  // onClosed(dismissedAlert: AlertComponent): void {
  //   this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  // }

  search(email: string) {
    if (email) {
      console.log(email);
    }
  }

  onStatusChange(proxy:ProxyType) {
    this.spinner.show();
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

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.subscriptionSearch) {
      this.subscriptionSearch.unsubscribe();
    }
  }
}

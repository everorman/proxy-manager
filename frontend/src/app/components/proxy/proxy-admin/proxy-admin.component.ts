import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
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
  proxyForm: FormGroup = new FormGroup({
    host: new FormControl('', [Validators.required, Validators.minLength(4)]),
    urlReset: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl(''),
    userId: new FormControl(''),
    hostUser: new FormControl(''),
    hostPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
    status: new FormControl('', [Validators.required, Validators.minLength(4)])
  });
  subscription!: Subscription;
  subscriptionSearch!: Subscription | undefined;
  users: SearchUserType[] = [];
  searchForm = new FormGroup({
    key: new FormControl(''),
  })

  
  alerts: any[] = [];

  private alertDuration = 5000;

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private proxyService: ProxyService,
    private modalService: BsModalService,
    private userService: UserService
  ) {
    this.proxyForm.get
  }

  ngOnInit(): void {
    this.subscriptionSearch = this.searchForm.get("key")?.valueChanges.subscribe(selectedValue => {
      console.log('key value changed')
      this.searchUser(selectedValue);

    })
    
    this.proxyList = this.route.snapshot.data.list;
    console.log(this.proxyList);
  }

  searchUser(key:string) {
    console.log('searchUser');
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.userService.search(key)
      .subscribe((res) => {
        this.users = (res as SearchUserType[]);
        console.log('searchUser', res);
      })
  }

  getControl(name: string) {
    console.log(name, this.proxyForm.get(name));
    return this.proxyForm.get(name) as FormControl;
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
    console.log(this.proxyForm.value);
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
      this.searchForm.reset();
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

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.subscriptionSearch) {
      this.subscriptionSearch.unsubscribe();
    }
  }
}

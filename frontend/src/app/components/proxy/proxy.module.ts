import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormatFullName } from '../../pipes/format-full-name';
import { ProxyStatusNamePipe } from '../../pipes/proxy-status-name.pipe';
import { ProxyAdminComponent } from '../proxy/proxy-admin/proxy-admin.component';
import { ProxyDashboardComponent } from '../proxy/proxy-dashboard/proxy-dashboard.component';
import { ProxyItemComponent } from '../proxy/proxy-item/proxy-item.component';
import { ProxyLoadingComponent } from './proxy-loading/proxy-loading.component';

@NgModule({
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    ProxyStatusNamePipe,
    ProxyAdminComponent,
    ProxyDashboardComponent,
    ProxyItemComponent,
    ProxyLoadingComponent,
    FormatFullName,
  ],
  exports: [
    ProxyAdminComponent,
    ProxyDashboardComponent,
    ProxyItemComponent,
    ProxyStatusNamePipe,
    FormatFullName
  ],
})
export class ProxyModule { }

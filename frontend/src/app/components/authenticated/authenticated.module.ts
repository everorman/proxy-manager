import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AddPageComponent } from '../add-page/add-page.component';
import { AppRoutingModule } from '../../app-routing.module';
import { HeaderComponent } from '../header/header.component';
import { NavBarTopComponent } from '../nav-bar-top/nav-bar-top.component';
import { CheckRoleUserPipe } from '../../pipes/check-role-user.pipe';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { ProxyAdminComponent } from '../proxy/proxy-admin/proxy-admin.component';
import { AuthenticatedComponent } from './authenticated.component';
import { FormControlPipe } from 'src/app/pipes/form-control.pipe';
import { SearchUserComponent } from '../searchUser/searchUser.component';
import { FormatFullaName } from 'src/app/pipes/format-full-name';
import { ProxyDashboardComponent } from '../proxy/proxy-dashboard/proxy-dashboard.component';
import { ProxyStatusNamePipe } from 'src/app/pipes/proxy-status-name.pipe';
import { ProxyItemComponent } from '../proxy/proxy-item/proxy-item.component';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { UsersAdminComponent } from '../usersAdmin/usersAdmin.component';




@NgModule({
  declarations: [
    AddPageComponent,
    HeaderComponent,
    ProgressBarComponent,
    NavBarTopComponent,
    AuthenticatedComponent,
    CheckRoleUserPipe,
    ProxyAdminComponent,
    FormControlPipe,
    ProxyStatusNamePipe,
    FormatFullaName,
    SearchUserComponent,
    ProxyDashboardComponent,
    ProxyItemComponent,
    UsersAdminComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AuthenticatedComponent]
})
export class AuthenticatedModule { }

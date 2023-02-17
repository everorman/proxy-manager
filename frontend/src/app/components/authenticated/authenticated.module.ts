import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DataTablesModule } from 'angular-datatables';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from '../../app-routing.module';
import { CheckRoleUserPipe } from '../../pipes/check-role-user.pipe';
import { FormControlPipe } from '../../pipes/form-control.pipe';
import { FormatFullName } from '../../pipes/format-full-name';
import { AddPageComponent } from '../add-page/add-page.component';
import { HeaderComponent } from '../header/header.component';
import { NavBarTopComponent } from '../nav-bar-top/nav-bar-top.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { ProxyModule } from '../proxy/proxy.module';
import { SearchUserComponent } from '../searchUser/searchUser.component';
import { UsersAdminComponent } from '../usersAdmin/usersAdmin.component';
import { AuthenticatedComponent } from './authenticated.component';



@NgModule({
  declarations: [
    AddPageComponent,
    HeaderComponent,
    ProgressBarComponent,
    NavBarTopComponent,
    AuthenticatedComponent,
    CheckRoleUserPipe,
    FormControlPipe,
    SearchUserComponent,
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
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    ProxyModule
  ],
  bootstrap: [AuthenticatedComponent]
})
export class AuthenticatedModule { }

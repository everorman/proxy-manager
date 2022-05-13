import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { AddPageComponent } from '../add-page/add-page.component';
import { HeaderComponent } from '../header/header.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { NavBarTopComponent } from '../nav-bar-top/nav-bar-top.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticatedComponent } from './authenticated.component';



@NgModule({
  declarations: [
    AddPageComponent,
    HeaderComponent,
    ProgressBarComponent,
    NavBarTopComponent,
    AuthenticatedComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgbModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AuthenticatedComponent]
})
export class AuthenticatedModule { }

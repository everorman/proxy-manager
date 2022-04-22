import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AddPageComponent } from './add-page/add-page.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { TokenInterceptor } from './interceptors/token-interceptor.service';
import { ListIPComponent } from './listIP/listIP.component';
import { LoginComponent } from './login/login.component';
import { ModalBasicComponent } from './modals/modalBasic/modalBasic.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';


@NgModule({
  declarations: [						
    AppComponent,
    HomeComponent,
      ListIPComponent,
      AddPageComponent,
      HeaderComponent,
      LoginComponent,
      ProgressBarComponent,
      ModalBasicComponent,
      AuthenticatedComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    DataTablesModule
    
  ],
  providers: [
    {  
      provide: HTTP_INTERCEPTORS,  
      useClass: TokenInterceptor,  
      multi: true  
    }  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

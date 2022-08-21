import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticatedModule } from './components/authenticated/authenticated.module';
import { ListIPComponent } from './components/listIP/listIP.component';
import { ModalBasicComponent } from './components/modalBasic/modalBasic.component';
import { RotateComponent } from './components/rotate/rotate.component';
import { GuestModule } from './guest/guest.module';
import { HomeComponent } from './home/home.component';
import { PriceCardComponent } from './home/price-card/price-card.component';
import { TokenInterceptor } from './interceptors/token-interceptor.service';
import { LoginComponent } from './login/login.component';
import { ProxyStatusNamePipe } from './pipes/proxy-status-name.pipe';


@NgModule({
  declarations: [	
    AppComponent,
    HomeComponent,
    RotateComponent,
    ListIPComponent,
    LoginComponent,
    ModalBasicComponent,
    PriceCardComponent
   ],
  imports: [
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticatedModule,
    GuestModule
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

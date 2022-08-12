import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestComponent } from './guest.component';
import { FaqsComponent } from './faqs/faqs.component';
import { TerminosCondicionesComponent } from './terminosCondiciones/terminosCondiciones.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    GuestComponent,
    FaqsComponent,
    TerminosCondicionesComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
})
export class GuestModule { }

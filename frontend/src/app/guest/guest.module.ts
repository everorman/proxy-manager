import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FaqsComponent } from './faqs/faqs.component';
import { GuestRoutingModule } from './guest-routing.module';
import { GuestComponent } from './guest.component';
import { TerminosCondicionesComponent } from './terminosCondiciones/terminosCondiciones.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
  declarations: [
    GuestComponent,
    FaqsComponent,
    TerminosCondicionesComponent
  ],
  imports: [
    CommonModule,
    GuestRoutingModule,
    RouterOutlet,
    AccordionModule.forRoot()
  ],
})
export class GuestModule { }

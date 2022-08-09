import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqsComponent } from './faqs/faqs.component';
import { GuestComponent } from './guest.component';
import { TerminosCondicionesComponent } from './terminosCondiciones/terminosCondiciones.component';


const routes: Routes = [
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'faq',
        component: FaqsComponent
      },
      {
        path: 'terms',
        component: TerminosCondicionesComponent
      },
      { path: '**', redirectTo: 'faq', }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestRoutingModule { }

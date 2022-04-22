import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPageComponent } from '../add-page/add-page.component';
import { ListIPComponent } from '../listIP/listIP.component';
import { CurrentIPResolver } from '../resolvers/current-ip.resolver';
import { AuthenticatedComponent } from './authenticated.component';
import { AuthGuard } from './authenticated.guard';
import { AuthenticatedResolver } from './authenticated.resolver';

const routes: Routes = [
  {
    path: '',
    component: AuthenticatedComponent,
    canActivateChild: [AuthGuard],
    resolve: {
      user: AuthenticatedResolver,
    },
    children: [
      {
        path: 'list',
        component: ListIPComponent
      },
      {
        path: 'add',
        component: AddPageComponent,
        resolve: {
          currentIP: CurrentIPResolver
        }
      },
      {
        path: '**',
        redirectTo: 'add',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticatedRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPageComponent } from '../add-page/add-page.component';
import { ListIPComponent } from '../listIP/listIP.component';
import { ProxyAdminComponent } from '../proxy/proxy-admin/proxy-admin.component';
import { CurrentIPResolver } from '../../resolvers/current-ip.resolver';
import { ProxyAdminListResolver } from '../../resolvers/proxy-admin-list.resolver';
import { AuthenticatedComponent } from './authenticated.component';
import { AuthGuard } from './authenticated.guard';
import { AuthenticatedResolver } from './authenticated.resolver';
import { ProxyDashboardComponent } from '../proxy/proxy-dashboard/proxy-dashboard.component';
import { ProxyListResolver } from 'src/app/resolvers/proxy-list.resolver';

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
        path: 'proxyAdmin',
        component: ProxyAdminComponent,
        resolve: {
          list: ProxyAdminListResolver
        }
      },
      {
        path: 'proxyDashboard',
        component: ProxyDashboardComponent,
        resolve: {
          list: ProxyListResolver
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

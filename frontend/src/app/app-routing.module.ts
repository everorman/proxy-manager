import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPageComponent } from './add-page/add-page.component';
import { HomeComponent } from './home/home.component';
import { ListIPComponent } from './listIP/listIP.component';
import { LoginComponent } from './login/login.component';
import { CurrentIPResolver } from './resolvers/current-ip.resolver';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'app',
    loadChildren: () => import('./authenticated/authenticated-routing.module').then(m => m.AuthenticatedRoutingModule),
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }

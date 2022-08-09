import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RotateComponent } from './components/rotate/rotate.component';
import { GuestComponent } from './guest/guest.component';
import { HomeComponent } from './home/home.component';
import { ConstructionPageComponent } from './layouts/constructionPage/constructionPage.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'construction',
    component: ConstructionPageComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'rotate/3kxfWSO6WdCB1A14LfIf',
    component: RotateComponent
  },
  {
    path: 'app',
    loadChildren: () => import('./components/authenticated/authenticated-routing.module').then(m => m.AuthenticatedRoutingModule),
  },
  {
    path: 'guest',
    loadChildren: () => import('./guest/guest-routing.module').then(m => m.GuestRoutingModule),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }

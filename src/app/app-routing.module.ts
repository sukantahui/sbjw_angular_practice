import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {CustomerComponent} from './pages/customer/customer.component';
import {ProductComponent} from './pages/product/product.component';
import {AuthComponent} from './pages/auth/auth.component';
import {AuthGuardService} from './services/auth-guard.service';
import {OwnerComponent} from './pages/owner/owner.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'customer', canActivate:  [AuthGuardService], component: CustomerComponent},
  {path: 'product', canActivate:  [AuthGuardService], component: ProductComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'owner', canActivate:  [AuthGuardService], component: OwnerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

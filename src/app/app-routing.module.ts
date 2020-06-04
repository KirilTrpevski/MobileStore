import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { HotDealsComponent } from './hot-deals/hot-deals.component';
import { PhoneComponent } from './phone/phone.component';
import {PhoneDetailsComponent} from './phone/phone-details/phone-details.component';
import {NewComponent} from './new/new.component';
import {PhoneResolverService} from './phone/phone-resolver.service';
import {LoginComponent} from './login/login.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {WishListComponent} from './wish-list/wish-list.component';

import {AuthGuard} from './login/auth/auth.guard';
import {AuthComponent} from './login/auth/auth.component';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'mobile-admin', component: AuthComponent },
  { path: 'new', component: NewComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'hot-deals', component: HotDealsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'phones', component: PhoneComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'wish-list', component: WishListComponent },
  { path: 'phones/:name', component: PhoneDetailsComponent, resolve: [PhoneResolverService] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

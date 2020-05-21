import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { HotDealsComponent } from './hot-deals/hot-deals.component';
import { PhoneComponent } from './phone/phone.component';
import {PhoneDetailsComponent} from './phone/phone-details/phone-details.component';
import {NewComponent} from './new/new.component';
import {PhoneResolverService} from './phone/phone-resolver.service';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'new', component: NewComponent },
  { path: 'home', component: HomeComponent },
  { path: 'hot-deals', component: HotDealsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'phones', component: PhoneComponent},
  {path: 'phones/:id', component: PhoneDetailsComponent, resolve: [PhoneResolverService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

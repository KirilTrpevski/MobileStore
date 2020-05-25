import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuHeaderComponent } from './menu-header/menu-header.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { HotDealsComponent } from './hot-deals/hot-deals.component';
import { PhoneItemComponent } from './phone/phone-item/phone-item.component';
import { PhoneComponent } from './phone/phone.component';
import { PhoneDetailsComponent } from './phone/phone-details/phone-details.component';
import { NewComponent } from './new/new.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {CommonModule} from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import {ShoppingCartService} from './shopping-cart/shopping-cart.service';
import { WishListComponent } from './wish-list/wish-list.component';
import {WishListService} from './wish-list/wish-list.service';
import {AuthComponent} from './login/auth/auth.component';
import {ShortenPipe} from './shared/shorten.pipe';
import { SpinnerComponent } from './shared/spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuHeaderComponent,
    HomeComponent,
    ContactComponent,
    HotDealsComponent,
    PhoneItemComponent,
    PhoneComponent,
    PhoneDetailsComponent,
    NewComponent,
    LoginComponent,
    ShoppingCartComponent,
    WishListComponent,
    AuthComponent,
    ShortenPipe,
    SpinnerComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatSliderModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FontAwesomeModule,
        CommonModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,

    ],
  providers: [ShoppingCartService, WishListService],
  bootstrap: [AppComponent]
})
export class AppModule { }

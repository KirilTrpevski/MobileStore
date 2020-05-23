import { Component, OnInit } from '@angular/core';
import {PhoneService} from '../phone/phone.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {ShoppingCartService} from '../shopping-cart/shopping-cart.service';
import {Phone} from '../shared/phone.model';


@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.css']
})
export class MenuHeaderComponent implements OnInit {
  isLoggedIn = false;
  phones: Phone[] =[];

  constructor(private phoneService: PhoneService, private afsAuth: AngularFireAuth, private router: Router,
              private cartService: ShoppingCartService) { }

  ngOnInit() {
    this.getCurrentUser();
    this.cartService.phonesChanged
      .subscribe(phones => {
        this.phones = phones;
      });
  }
  getCurrentUser() {
    this.phoneService.isAuth()
      .subscribe(auth => {
        if (auth) {
          console.log('User Loged');
          this.isLoggedIn = true;
        } else {
          console.log('User not logged');
          this.isLoggedIn = false;
        }
      });
  }

  onLogOut() {
    this.afsAuth.signOut();
  }

  toShoppingCart() {
    this.router.navigate(['/shopping-cart']);
  }
  toWishList() {
    this.router.navigate(['//wish-list']);
  }

}

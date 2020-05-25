import { Component, OnInit } from '@angular/core';
import {PhoneService} from '../phone/phone.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {ShoppingCartService} from '../shopping-cart/shopping-cart.service';
import {Phone} from '../shared/phone.model';
import {WishListService} from '../wish-list/wish-list.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../login/auth/auth.service';


@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.css']
})
export class MenuHeaderComponent implements OnInit {
  isLoggedIn = false;
  phones: Phone[] = [];
  phonesList: Phone[] = [];
  adminSub: Subscription;
  isAuthenticated = false;

  constructor(private phoneService: PhoneService, private afsAuth: AngularFireAuth, private router: Router,
              private cartService: ShoppingCartService, private wishListService: WishListService,
              private authService: AuthService) { }

  ngOnInit() {
    this.getCurrentUser();
    this.wishListService.phonesChanged
      .subscribe(phones => {
        this.phonesList = phones;
      });
    this.cartService.phonesChanged
      .subscribe(phones => {
        this.phones = phones;
      });

    this.adminSub = this.authService.admin
      .subscribe((user) => {
        this.isAuthenticated = user ? true : false; // !!user
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

  adminLogOut() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  toShoppingCart() {
    this.router.navigate(['/shopping-cart']);
  }
  toWishList() {
    this.router.navigate(['//wish-list']);
  }

}

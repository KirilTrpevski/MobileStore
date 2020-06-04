import {Component, Input, OnInit} from '@angular/core';
import { Phone } from 'src/app/shared/phone.model';
import {PhoneService} from '../phone.service';

@Component({
  selector: 'app-phone-item',
  templateUrl: './phone-item.component.html',
  styleUrls: ['./phone-item.component.css']
})

export class PhoneItemComponent implements OnInit{
  @Input() phone: Phone;
  @Input() index: number;
  phoneDialog: Phone;
  phoneWishlistDialog: Phone;
  showWishlistDialog = false;
  showCartDialog = false;
  isLoggedIn = false;

  constructor(private phoneService: PhoneService) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  addToCart(phone: Phone) {
    this.phoneService.addedPhoneToCart(phone);
  }

  addToWishList(phone: Phone) {
    this.phoneService.addedPhoneToWishList(phone);
  }

  getCurrentUser() {
    this.phoneService.isAuth()
      .subscribe(auth => {
        if (auth) {
          // console.log('User Loged');
          this.isLoggedIn = true;
        } else {
          // console.log('User not logged');
          this.isLoggedIn = false;
        }
      });
  }

  onShowCartDialog(phone: Phone) {
    this.phoneDialog = phone;
    this.showCartDialog = true;
    setTimeout(() => {
      this.showCartDialog = null;
    }, 1500);
  }

  onShowWishListDialog(phone: Phone) {
    this.phoneWishlistDialog = phone;
    this.showWishlistDialog = true;
    setTimeout(() => {
      this.showWishlistDialog = null;
    }, 1500);
  }
}

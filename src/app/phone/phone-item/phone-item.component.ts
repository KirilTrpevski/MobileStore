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
}

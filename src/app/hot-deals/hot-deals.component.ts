import { Component, OnInit } from '@angular/core';
import {PhoneService} from '../phone/phone.service';
import {Phone} from '../shared/phone.model';

@Component({
  selector: 'app-hot-deals',
  templateUrl: './hot-deals.component.html',
  styleUrls: ['./hot-deals.component.css']
})
export class HotDealsComponent implements OnInit {

  samsungList1: Phone[] = [];
  phones: Phone[] = [];
  isLoggedIn = false;
  constructor(private phoneService: PhoneService) { }

  ngOnInit() {
    // this.samsungList1 = this.phoneService.getSamsung();
    this.phoneService.onFetchPhones()
      .subscribe((phones: Phone[]) => {
        for (let phone of phones) {
          if (phone.brand.toLowerCase() === 'samsung') {
            this.samsungList1.push(phone);
          }
        }
      });
    this.getCurrentUser();
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

  onAddToCart(phone: Phone) {
    const newPrice = phone.price - (phone.price * 0.15);
    phone = new Phone(phone.name, newPrice, phone.desc, phone.image, phone.brand, phone.ram, phone.processor,
      phone.displaySize, phone.displayResolution, phone.gpu, phone.storage, phone.camera, phone.os, phone.dimesions,
      phone.weight, phone.batery, phone.pieces);
    this.phoneService.addedPhoneToCart(phone);
  }

  onAddToWishList(phone: Phone) {
    const newPrice = phone.price - (phone.price * 0.15);
    phone = new Phone(phone.name, newPrice, phone.desc, phone.image, phone.brand, phone.ram, phone.processor,
      phone.displaySize, phone.displayResolution, phone.gpu, phone.storage, phone.camera, phone.os, phone.dimesions,
      phone.weight, phone.batery, phone.pieces);
    this.phoneService.addedPhoneToWishList(phone);
  }

}

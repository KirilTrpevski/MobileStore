import { Component, OnInit } from '@angular/core';
import {Phone} from '../shared/phone.model';
import {WishListService} from './wish-list.service';
import {PhoneService} from '../phone/phone.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  phones: Phone[] = [];
  constructor(private wishListService: WishListService, private phoneService: PhoneService) { }

  ngOnInit(): void {
    this.phones = this.wishListService.getWishListPhones();
    this.wishListService.phonesChanged
      .subscribe(phones => {
        this.phones = phones;
      });
  }

  addToCart(phone) {
    this.phoneService.addedPhoneToCart(phone);
  }

  onDelete(id: number) {
    this.wishListService.deleteFromWislist(id);
  }
}

import { Component, OnInit } from '@angular/core';
import {Phone} from '../shared/phone.model';
import {WishListService} from './wish-list.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  phones: Phone[] = [];
  constructor(private wishListService: WishListService) { }

  ngOnInit(): void {
    this.phones = this.wishListService.getWishListPhones();
    this.wishListService.phonesChanged
      .subscribe(phones => {
        this.phones = phones;
      });
  }

}

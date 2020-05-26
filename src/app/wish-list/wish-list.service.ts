import {Injectable} from '@angular/core';
import {Phone} from '../shared/phone.model';
import {Subject} from 'rxjs';

@Injectable()

export class WishListService {
  phones: Phone[] = [];
  phonesChanged = new Subject<Phone[]>();

  addToWishList(phone: Phone) {
    this.phones.push(phone);
    this.phonesChanged.next(this.phones.slice());
  }

  getWishListPhones() {
    return this.phones;
  }

  deleteFromWislist(id: number) {
    this.phones.splice(id, 1);
    this.phonesChanged.next(this.phones);
  }
}

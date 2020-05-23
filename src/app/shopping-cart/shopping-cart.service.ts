import {Injectable} from '@angular/core';
import {Phone} from '../shared/phone.model';
import {Subject} from 'rxjs';

@Injectable()

export class ShoppingCartService {
  phonesOnCard: Phone[] = [];
  phonesChanged = new Subject<Phone[]>();

  addToCart(phone: Phone) {
    this.phonesOnCard.push(phone);
    this.phonesChanged.next(this.phonesOnCard.slice());
  }

  getCartPhones() {
    return this.phonesOnCard.slice();
  }

  deletePhonesFromCart(index: number) {
    this.phonesOnCard.splice(index, 1);
    this.phonesChanged.next(this.phonesOnCard.slice());
  }
}

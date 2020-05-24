import { Component, OnInit } from '@angular/core';
import {Phone} from '../shared/phone.model';
import {ShoppingCartService} from './shopping-cart.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  phones: Phone[] = [];
  finalPrice: number;

  constructor(private cartService: ShoppingCartService, private router: Router) { }

  ngOnInit() {
    this.phones = this.cartService.getCartPhones();
    this.total();
    this.cartService.phonesChanged
      .subscribe((phones: Phone[]) => {
        this.phones = phones;
      });
  }

  backToShopping() {
    this.router.navigate(['/phones']);
  }

  calculatePrice(price: number, amount) {
    // console.log(price);
    // console.log(amount.value);
    return +(price * amount.value).toFixed(2);
  }

  delete(index) {
    this.cartService.deletePhonesFromCart(index);
    this.total();
    this.cartService.phonesChanged
      .subscribe((phones: Phone[]) => {
        this.phones = phones;
      });
  }



  total() {
    setTimeout(() => {
      const el = document.getElementsByName('cena');
      let sum = 0;
      for (let i = 0; i < el.length; i++) {
        // console.log(el.item(i).innerText.slice(1, el.item(i).innerText.length));
        sum += +el.item(i).innerText.slice(1, el.item(i).innerText.length).replace(',', '');
        console.log("input Field" + el.item(i).innerText.slice(1, el.item(i).innerText.length).replace(',', ''));
    }
      console.log(sum.toFixed(2));
      this.finalPrice = +sum.toFixed(2);
      return sum.toFixed(2);
    }, 50);
  }
}

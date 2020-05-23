import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Phone} from '../shared/phone.model';
import {map, tap} from 'rxjs/operators';
import { AngularFireAuth} from '@angular/fire/auth';
import {ShoppingCartService} from '../shopping-cart/shopping-cart.service';

@Injectable({
  providedIn: 'root'
})

export class PhoneService {

  phones: Phone[] = [];
  constructor(private http: HttpClient, private afsAuth: AngularFireAuth, private cartService: ShoppingCartService) {
  }

  onPost(phone: Phone) {
    this.http.post('https://mobilestore-2df05.firebaseio.com/phones.json', phone)
      .subscribe((item: Phone) => {
        console.log(item);
      });
  }

  onFetchPhones() {
    return this.http.get<Phone[]>('https://mobilestore-2df05.firebaseio.com/phones.json')
      .pipe(map((phones: Phone[]) => {
        const phoneArray: Phone[] = [];
        for (const i in phones) {
          phoneArray.push({...phones[i]});
        }
        return phoneArray;
      }), tap(phones => {
        this.phones = phones;
      }));
  }

  getPhone(name: string) {
    for (let phone of this.phones) {
      if(phone.name === name) {
        return phone;
      }
    }
  }

  getPhones() {
    return this.phones.slice();
  }


  isAuth() {
    return this.afsAuth.authState.pipe(map((authState) => {
      if (!authState) {
        return null;
      } else {
        console.log('Logged123');
        return authState.email;
      }
    }));
  }

  addedPhoneToCart(phone: Phone) {
    this.cartService.addToCart(phone);
  }
}

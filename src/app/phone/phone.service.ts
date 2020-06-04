import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Phone} from '../shared/phone.model';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import { AngularFireAuth} from '@angular/fire/auth';
import {ShoppingCartService} from '../shopping-cart/shopping-cart.service';
import {WishListService} from '../wish-list/wish-list.service';
import {AuthService} from '../login/auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class PhoneService {

  phones: Phone[] = [];

  constructor(private http: HttpClient, private afsAuth: AngularFireAuth, private cartService: ShoppingCartService,
              private wishListService: WishListService, private authService: AuthService) {
  }

  onPost(phone: Phone) {
    return this.authService.admin.pipe(take(1), exhaustMap(admin => {
      return this.http.post('https://mobilestore-2df05.firebaseio.com/phones.json', phone,
        {
          params: new HttpParams().set('auth', admin.token)
        });
    }));
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
        return authState.email;
      }
    }));
  }

  addedPhoneToCart(phone: Phone) {
    this.cartService.addToCart(phone);
  }

  addedPhoneToWishList(phone: Phone) {
    this.wishListService.addToWishList(phone);
  }
}

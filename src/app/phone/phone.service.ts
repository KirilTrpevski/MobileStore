import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Phone} from '../shared/phone.model';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PhoneService {

  phones: Phone[] = [];
  constructor(private http: HttpClient) {
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

  getPhone(id: number) {
    return this.phones[id];
  }

  getPhones() {
    return this.phones.slice();
  }

  setPhones(phone: Phone[]) {
    this.phones = phone;
  }
}

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {PhoneService} from './phone.service';
import {Phone} from '../shared/phone.model';

@Injectable({
  providedIn: 'root'
})
export class PhoneResolverService implements Resolve<Phone[]> {

  constructor(private phoneService: PhoneService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const phones = this.phoneService.getPhones();
    if (phones.length === 0) {
      return this.phoneService.onFetchPhones();
    } else {
      return phones;
    }
  }
}

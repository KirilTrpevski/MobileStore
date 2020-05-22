import { Component, OnInit } from '@angular/core';
import { Phone } from '../shared/phone.model';
import {PhoneService} from './phone.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})

export class PhoneComponent implements OnInit {

  brands = { apple: false, samsung: false, huawei: false, lg: false, alcatel: false, sony: false};
  filteredProducts: Phone[] = [];

  phones: Phone[] = [];

  constructor(private phoneService: PhoneService) {
  }

  ngOnInit() {
    // this.filteredProducts = this.phones;
    this.phoneService.onFetchPhones()
        .subscribe((phones) => {
          this.phones = phones;
          this.filteredProducts = phones;
        });
  }

  onChange() {
    if (!this.brands['samsung'] && !this.brands['apple'] && !this.brands['huawei'] && !this.brands['sony'] && !this.brands['lg'] && !this.brands['alcatel']) {
      this.filteredProducts = this.phones;
    } else {
      this.filteredProducts = this.phones.filter(x =>
        (x.brand.toLowerCase() === 'samsung' && this.brands.samsung)
        || (x.brand.toLowerCase() === 'apple' && this.brands.apple)
        || (x.brand.toLowerCase() === 'huawei' && this.brands.huawei)
        || (x.brand.toLowerCase() === 'sony' && this.brands.sony)
        || (x.brand.toLowerCase() === 'lg' && this.brands.lg)
        || (x.brand.toLowerCase() === 'alcatel' && this.brands.alcatel)
      );
    }
    }

    compareA(a: Phone, b: Phone) {
    let comparison = 0;
    if (a.price > b.price) {
      comparison = 1;
    } else {
      comparison = -1;
    }
    return comparison;
    }

    compareD(a: Phone, b: Phone) {
      let comparison = 0;
      if (a.price < b.price) {
        comparison = 1;
      } else {
        comparison = -1;
      }
      return comparison;
    }
    sortBypriceAscending() {
      this.filteredProducts.sort(this.compareA);
    }

    sortByPriceDescending() {
    this.filteredProducts.sort(this.compareD);
    }
  sorting(value: string) {
    switch (value) {
      case 'ascending':
        this.sortBypriceAscending();
        break;
      case 'descending':
        this.sortByPriceDescending();
        break;
    }
  }
}


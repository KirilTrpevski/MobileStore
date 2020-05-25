import { Component, OnInit } from '@angular/core';
import {PhoneService} from '../phone/phone.service';
import {Phone} from '../shared/phone.model';

@Component({
  selector: 'app-hot-deals',
  templateUrl: './hot-deals.component.html',
  styleUrls: ['./hot-deals.component.css']
})
export class HotDealsComponent implements OnInit {

  samsungList1: Phone[] = [];
  constructor(private phoneService: PhoneService) { }

  ngOnInit() {
    this.samsungList1 = this.phoneService.getSamsung();
  }

}

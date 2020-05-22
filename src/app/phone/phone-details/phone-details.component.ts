import { Component, OnInit } from '@angular/core';
import {Phone} from '../../shared/phone.model';
import {ActivatedRoute, Params} from '@angular/router';
import {PhoneService} from '../phone.service';

@Component({
  selector: 'app-phone-details',
  templateUrl: './phone-details.component.html',
  styleUrls: ['./phone-details.component.css']
})
export class PhoneDetailsComponent implements OnInit {
  phone: Phone;
  name: string;
  id: number;

  constructor(private route: ActivatedRoute, private phoneService: PhoneService) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.name = this.route.snapshot.params['name'];
    console.log(this.name);
    this.phone = this.phoneService.getPhone(this.name);

    // console.log(id);
    // this.route.params.subscribe((params: Params) => {
    //   this.phone = this.phoneService.getPhone(+params['id']);
    // });
    // console.log(this.phone);
  }
}

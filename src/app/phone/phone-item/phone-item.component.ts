import { Component, Input } from '@angular/core';
import { Phone } from 'src/app/shared/phone.model';

@Component({
  selector: 'app-phone-item',
  templateUrl: './phone-item.component.html',
  styleUrls: ['./phone-item.component.css']
})

export class PhoneItemComponent {
  @Input() phone: Phone;
  @Input() index: number;


}

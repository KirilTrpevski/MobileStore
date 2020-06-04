import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Phone} from '../phone.model';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.css']
})
export class CartDialogComponent implements OnInit {

  @Input() phone: Phone;

  constructor() { }

  ngOnInit(): void {
  }

}

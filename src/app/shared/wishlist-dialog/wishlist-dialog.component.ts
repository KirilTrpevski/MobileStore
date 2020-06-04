import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Phone} from '../phone.model';

@Component({
  selector: 'app-wishlist-dialog',
  templateUrl: './wishlist-dialog.component.html',
  styleUrls: ['./wishlist-dialog.component.css']
})
export class WishlistDialogComponent implements OnInit {

  @Input() phone: Phone;

  constructor() { }

  ngOnInit(): void {
  }

}

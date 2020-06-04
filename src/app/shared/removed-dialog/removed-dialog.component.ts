import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Phone} from '../phone.model';

@Component({
  selector: 'app-removed-dialog',
  templateUrl: './removed-dialog.component.html',
  styleUrls: ['./removed-dialog.component.css']
})
export class RemovedDialogComponent implements OnInit {

  @Input() phone: Phone;

  constructor() { }

  ngOnInit(): void {
  }

}

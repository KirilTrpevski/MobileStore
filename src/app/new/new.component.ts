import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PhoneService} from '../phone/phone.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  @ViewChild('form', {static: true}) form: NgForm;

  constructor(private phoneService: PhoneService) { }

  ngOnInit(): void {
  }


  onSubmit() {
    this.phoneService.onPost(this.form.value);
    // console.log(this.form.value);
  }
}

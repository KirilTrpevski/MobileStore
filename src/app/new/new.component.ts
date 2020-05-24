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
    alert('The item has been added to the page');
    this.form.reset();
    // console.log(this.form.value);
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @ViewChild('form', {static: true}) form: NgForm;

  emailSent = false;
  name: string;

  constructor() { }

  ngOnInit() {
  }

  scrol(element: HTMLElement) {
    element.scrollIntoView({behavior: 'smooth'});
  }

  onSendEmail() {
    console.log(this.form.value.firstname);
    this.name = this.form.value.firstname;
    this.form.reset();
    this.emailSent = true;
    setTimeout(() => {
      this.emailSent = false;
    }, 3500);
  }

}

import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Phone} from '../shared/phone.model';
import {PhoneService} from '../phone/phone.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  date = new Date();
  @ViewChild('mail', {static: true}) email;
  sub: number;
  countDownDate = new Date(new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + 2, 0, 0, 0)).getTime();
  days; hours; minutes; seconds;
  isLoggedIn = false;
  phones: Phone[] = [];
  phoneList: Phone[] = [];
  topSelling: Phone[] = [];
  firstPhones: Phone[] = [];
  phoneDialog: Phone;
  phoneWishlistDialog: Phone;
  showCartDialog = false;
  showWishlistDialog = false;
  constructor(private router: Router, private phoneService: PhoneService) { }

  ngOnInit() {
    this.countdown();
    this.phoneService.onFetchPhones()
      .subscribe((phones) => {
        // console.log(phones);
        this.phones = phones;
        setTimeout(() => {
          this.topSelling = this.phones.slice(0, 8);
        }, 200)
        this.phoneList.push(phones[2], phones[3], phones[9], phones[10]);
        this.firstPhones.push(phones[4], phones[6], phones[9]);
      });
    this.getCurrentUser();
  }


  countdown() {
    this.sub = setInterval(() => {
      let now = new Date().getTime();

      let distance = this.countDownDate - now;

      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      this.days = days;
      this.hours = hours;
      this.minutes = minutes;
      this.seconds = seconds;

      console.log(this.days + ' ' + this.hours + ' ' + this.minutes + ' ' + this.seconds);
    }, 1000);

  }

  ngOnDestroy(): void {
    clearInterval(this.sub);
  }

  scrol(element: HTMLElement) {
    element.scrollIntoView({behavior: 'smooth'});
}

goToHotDeals() {
   this.router.navigate(['/hot-deals']);
}

  getCurrentUser() {
    this.phoneService.isAuth()
      .subscribe(auth => {
        if (auth) {
          // console.log('User Loged');
          this.isLoggedIn = true;
        } else {
          // console.log('User not logged');
          this.isLoggedIn = false;
        }
      });
  }

  onAddToWishlist(phone: Phone) {
    this.phoneService.addedPhoneToWishList(phone);
  }

  onAddToCart(phone: Phone) {
    this.phoneService.addedPhoneToCart(phone);
  }

  onSendEmail(mail) {
    console.log(mail);
    this.email.reset();
    alert('The email has been sent to ' + mail);
  }

  onShowCartDialog(phone: Phone) {
    this.phoneDialog = phone;
    this.showCartDialog = true;
    setTimeout(() => {
      this.showCartDialog = null;
    }, 1500);
  }

  onShowWishListDialog(phone: Phone) {
    this.phoneWishlistDialog = phone;
    this.showWishlistDialog = true;
    setTimeout(() => {
      this.showWishlistDialog = null;
    }, 1500);
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  date = new Date();
  sub: number;
  countDownDate = new Date(new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + 2, 0, 0, 0)).getTime();
  days; hours; minutes; seconds;
  constructor(private router: Router) { }

  ngOnInit() {
    this.countdown();
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
}

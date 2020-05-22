import { Component, OnInit } from '@angular/core';
import {PhoneService} from '../phone/phone.service';
import {AngularFireAuth} from '@angular/fire/auth';


@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.css']
})
export class MenuHeaderComponent implements OnInit {
  isLoggedIn = false;

  constructor(private phoneService: PhoneService, private afsAuth: AngularFireAuth) { }

  ngOnInit() {
    this.getCurrentUser();
  }
  getCurrentUser() {
    this.phoneService.isAuth()
      .subscribe(auth => {
        if (auth) {
          console.log('User Loged');
          this.isLoggedIn = true;
        } else {
          console.log('User not logged');
          this.isLoggedIn = false;
        }
      });
  }

  onLogOut() {
    this.afsAuth.signOut();
  }

}

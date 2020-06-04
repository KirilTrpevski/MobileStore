import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {auth} from 'firebase';
import {Observable} from 'rxjs';
import {AuthService} from './auth/auth.service';
import {emailVerified} from '@angular/fire/auth-guard';
import {PhoneService} from '../phone/phone.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  user: Observable<any>;
  errorMsg: string;
  isLoggedIn = false;
  emailSent = false;

  constructor(private authService: AuthService, private router: Router,
              private afsAuth: AngularFireAuth, private phoneService: PhoneService) { }

  ngOnInit(): void {
    this.user = this.afsAuth.authState;

    const url = this.router.url;

    this.confirmSignIn(url);

    this.getCurrentUser();

  }

  async sendEmailLink(email: string) {
    const actionCodeSettings  = {
      url: 'https://localhost:4200/login',
      handleCodeInApp: true
    };

    try {
      await this.afsAuth.sendSignInLinkToEmail(email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      console.log(window.localStorage);
      this.emailSent = true;
    } catch (error) {
      this.errorMsg = error.message;
    }
  }
  async confirmSignIn(url) {
    try {
      if (this.afsAuth.isSignInWithEmailLink(url)) {
        const email = window.localStorage.getItem('emailForSignIn');

        const result = await this.afsAuth.signInWithEmailLink(email, url);
        if (result) {
          window.localStorage.removeItem('emailForSignIn');
        } else {
          console.log('An error ocurred');
        }
      }
      this.router.navigate(['/home']);
    } catch (error) {
      this.errorMsg = error.message;
    }
  }

  loginWithFacebook() {
    this.authService.onLoginWithFacebook();
  }

  loginWithGoogle() {
    this.authService.onGoogleLogin();
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
}

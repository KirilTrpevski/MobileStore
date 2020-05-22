import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {auth} from 'firebase';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Observable<any>;
  email: string;
  emailSent = false;

  errorMsg: string;

  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
    this.user = this.afAuth.authState;

    const url = this.router.url;

    this.confirmSignIn(url);

    console.log(url);
  }

  async sendEmailLink(email: string) {
    const actionCodeSettings  = {
      url: 'https://localhost:4200/login',
      handleCodeInApp: true
    };

    try {
      await this.afAuth.sendSignInLinkToEmail(email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      console.log(window.localStorage);
      this.emailSent = true;
    } catch (error) {
      this.errorMsg = error.message;
    }
  }
  async confirmSignIn(url) {
    try {
      if (this.afAuth.isSignInWithEmailLink(url)) {
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
          // email = window.prompt('Please provide your email for confirmation');
        }

        const result = await this.afAuth.signInWithEmailLink(email, url);
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

  onLoginWithFacebook() {
    // console.log('facebb');
    this.afAuth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  onGoogleLogin() {
    // console.log('google');
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

}

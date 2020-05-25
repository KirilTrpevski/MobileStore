import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {auth} from 'firebase';
import {BehaviorSubject, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Admin} from '../../shared/admin.model';
import {catchError, tap} from 'rxjs/operators';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  admin = new BehaviorSubject<Admin>(null);
  private tokenExpTimer: any;


  constructor(private http: HttpClient, private router: Router, public afAuth: AngularFireAuth) {
  }

  onLoginWithFacebook() {
    // console.log('facebb');
    this.afAuth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  onGoogleLogin() {
    // console.log('google');
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB498in47z5dGnye3EyD_D7GOmlg7wiZbI',
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }));
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      tokenExpDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new Admin(userData.email, userData.id, userData._token, new Date(userData.tokenExpDate));

    if (loadedUser.token) {
      this.admin.next(loadedUser);
      const expDuration = new Date(userData.tokenExpDate).getTime() - new Date() . getTime();
      this.autoLogOut(expDuration);
    }
  }

  logout() {
    this.admin.next(null);
    this.router.navigate(['/book']);
    localStorage.removeItem('userData');
    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
    }
    this.tokenExpTimer = null;
  }

  autoLogOut(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpTimer = setTimeout(() => {
      this.logout();
      this.router.navigate(['/mobile-admin']);
    }, expirationDuration);
  }

  private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    const expDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new Admin(email, userId, token, expDate);
    this.admin.next(user);
    this.autoLogOut(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = 'An unknown error occurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMsg);
    }
    switch (errorRes.error.error.message) {
      case  'EMAIL_EXISTS':
        errorMsg = 'This email is already used';
        break;
      case  'EMAIL_NOT_FOUND':
        errorMsg = 'This email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMsg = 'The password was incorrect';
        break;
    }
    return throwError(errorMsg);
  }

}

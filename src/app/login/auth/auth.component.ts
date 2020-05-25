import {Component} from '@angular/core';
import {AuthResponseData, AuthService} from './auth.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent {

  error: string =  null;

  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit(form: NgForm) {
    // console.log(form.value);
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    // this.isLoading = true;
    authObs = this.authService.login(email, password);

    authObs.subscribe((resData) => {
      console.log(resData);
      // this.isLoading = false;
      this.router.navigate(['/new']);
    }, errorMessage => {
      this.error = errorMessage;
      // this.isLoading = false;
    });
    form.reset();
  }
}

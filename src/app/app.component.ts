import { Component } from '@angular/core';
import {AuthService} from './login/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MobileStore';

  constructor(private authService: AuthService) {
    this.authService.autoLogin();
  }
}

import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sepa-rate-ui';

  constructor(private router: Router) {
  }

  isLoggedIn() {
    return localStorage.getItem('user');
  }

  logOut() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }

  getUsername() {
    return JSON.parse(localStorage.getItem('user')).username;
  }
}

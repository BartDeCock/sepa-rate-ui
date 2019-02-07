import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './user/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sepa-rate-ui';

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  logOut() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  getUsername() {
    return this.authService.credentials.userName;
  }
}

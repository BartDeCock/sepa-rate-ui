import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {SeparationService} from '../../separation/services/separation.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../user/services/authentication.service';

@Component({
  selector: 'app-rating-overview',
  templateUrl: './rating-overview.component.html',
  styleUrls: ['./rating-overview.component.scss']
})
export class RatingOverviewComponent implements OnInit {
  private username: any;
  separations: Observable<any[]>;
  userCountry;

  constructor(private separationService: SeparationService, private router: Router, private authService: AuthenticationService) {
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/login');
    } else {
      this.username = this.authService.credentials.userName;
      this.userCountry = this.authService.credentials.country;
      this.separations = this.separationService.getAllSeparations();
    }
  }

  isUsersCountry(country: string) {
    return country.toLowerCase() === this.userCountry.toLowerCase();
  }
}

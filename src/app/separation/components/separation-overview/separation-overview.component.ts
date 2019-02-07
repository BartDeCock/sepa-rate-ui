import {Component, OnInit} from '@angular/core';
import {SeparationService} from '../../services/separation.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from '../../../user/services/authentication.service';

@Component({
  selector: 'app-separation-overview',
  templateUrl: './separation-overview.component.html',
  styleUrls: ['./separation-overview.component.scss']
})
export class SeparationOverviewComponent implements OnInit {
  private username: any;
  separations: Observable<any[]>;

  constructor(private separationService: SeparationService, private router: Router, private authService: AuthenticationService) {
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/login');
    } else {
      this.username = this.authService.credentials.userName;
      this.separations = this.separationService.getSeparations(this.username);
    }
  }

  doFilter(f: NgForm) {
    this.separations = this.separationService.getSeparations(this.username, {filter: f.value.filter});
  }
}

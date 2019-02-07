import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {validateRequired} from '../../../util/required.validator';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFailed: boolean;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {
    this.loginForm = fb.group({
      username: ['', validateRequired],
      password: ['', validateRequired]
    });
  }

  ngOnInit() {
  }

  login() {
    if (this.loginForm.valid) {
      this.authenticationService.login(this.loginForm.value)
        .subscribe(() => this.router.navigateByUrl(''));
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {validateRequired} from '../../../util/required.validator';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFailed: boolean;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = fb.group({
      username: ['', validateRequired],
      password: ['', validateRequired]
    });
  }

  ngOnInit() {
  }

  login() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value)
        .subscribe(res => {
          if (!res) {
            this.loginFailed = true;
          } else {
            localStorage.setItem('user', JSON.stringify(res));
            this.router.navigateByUrl('');
          }
        });
    }
  }
}

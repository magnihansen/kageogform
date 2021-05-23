import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../../services/auth.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  email: string;
  password: string;
  loginmessage: string;
  constructor(private db: AngularFireDatabase, private authService: AuthService, private router: Router) {
    if (localStorage.getItem('token') !== '') {
      console.log('User is already authenticated');
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    this.loginmessage = '';
    this.authService.signinUser(this.email, this.password);
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.loginmessage = localStorage.getItem('LoginError');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      emp_code: ['', Validators.required],
      password: ['', Validators.required]
    })

    console.log(this.loginForm)
  }

  login() {
    this.authService.login(this.loginForm.value)
  }

  get password() {
    return this.loginForm.get('password')
  }

  get emp_code() {
    return this.loginForm.get('emp_code')
  }

}

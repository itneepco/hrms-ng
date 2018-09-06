import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  errorMsg: string;

  constructor(private fb: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      emp_code: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
      password: ['', Validators.required]
    })
  }

  login() {
    if(this.loginForm.invalid) return
    
    this.authService.login(this.emp_code.value, this.password.value)
      .then(user => {
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'
        this.router.navigateByUrl(returnUrl)
      })
      .catch((error: HttpErrorResponse) => {
        console.log(error)
        if(error.status == 401)
          this.errorMsg = "Invalid employee code and password combination"
        else   
          this.errorMsg = "Internal server error!! Please contact IT administrator"
      })
  }

  get password() {
    return this.loginForm.get('password')
  }

  get emp_code() {
    return this.loginForm.get('emp_code')
  }

}

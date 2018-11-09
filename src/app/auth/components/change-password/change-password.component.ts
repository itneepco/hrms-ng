import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { PasswordValidators } from '../../validators/password.validator';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  passwdChangeForm: FormGroup

  constructor(private fb: FormBuilder, 
    private auth: AuthService,
    private dialogRef: MatDialogRef<ChangePasswordComponent>) { }

  ngOnInit() {
    this.passwdChangeForm = this.fb.group({
      old_password: ['', Validators.required],
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_new_password: ['', Validators.required],
      emp_code: this.auth.currentUser.emp_code
    },
    {
      validator: PasswordValidators.shouldMatchPassword
    })
  }

  changePassword() {
    if(this.passwdChangeForm.invalid) return

    this.auth.changePassword(this.passwdChangeForm.value).subscribe(data => console.log(data))
  }

  get old_password() {
    return this.passwdChangeForm.get('old_password')
  }

  get new_password() {
    return this.passwdChangeForm.get('new_password')
  }

  get confirm_new_password() {
    return this.passwdChangeForm.get('confirm_new_password')
  }
}

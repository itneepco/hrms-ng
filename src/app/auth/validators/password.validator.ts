import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordValidators {
  static validOldPassword(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value != 'pass123') {
          resolve({ validOldPassword: true })
        } else {
          resolve(null);
        }
      }, 2000);
    });
  }

  static shouldMatchPassword(control: AbstractControl): ValidationErrors | null {
    let passwd = control.get('new_password').value;
    let confirm_passwd = control.get("confirm_new_password").value;

    if (passwd != confirm_passwd) {
      control.get('confirm_new_password').setErrors({ shouldMatchPassword: true })
    }

    return null;
  }
}
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"]
})
export class ForgotPasswordComponent implements OnInit {
  resetForm: FormGroup;
  errorMsg: string;
  infoMsg: string;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit() {
    this.resetForm = this.fb.group({
      emp_code: ["", [Validators.required, Validators.pattern("[0-9]{6}")]],
      // dob: ["", Validators.required]
      email: ["", Validators.required]
    });
  }

  resetPassword() {
    if (this.resetForm.invalid) return;

    this.errorMsg = null;
    this.infoMsg = null;

    this.auth
      .resetPassword(this.emp_code.value, this.email.value)
      .then(response => {
        this.infoMsg = response["message"];
        this.resetForm.reset();
        Object.keys(this.resetForm.controls).forEach(name => {
          const control = this.resetForm.controls[name];
          control.setErrors(null);
        });
      })
      .catch((response: HttpErrorResponse) => {
        console.log(response);
        if (response.status == 404) this.errorMsg = response.error.message;
        else this.errorMsg = response.error.message;
      });
  }

  get email() {
    return this.resetForm.get("email");
  }

  get emp_code() {
    return this.resetForm.get("emp_code");
  }

  // get dob() {
  //   return this.resetForm.get('dob')
  // }
}

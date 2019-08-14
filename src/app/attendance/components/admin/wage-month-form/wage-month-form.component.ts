import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WageMonthService } from 'src/app/attendance/services/wage-month.service';


@Component({
  selector: "app-wage-month-form",
  templateUrl: "./wage-month-form.component.html",
  styleUrls: ["./wage-month-form.component.scss"]
})
export class WageMonthFormComponent implements OnInit {
  wageMonthForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder,
    private wageMonthService: WageMonthService,
    private snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<WageMonthFormComponent>) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.wageMonthForm = this.fb.group({
      from_date: ["", Validators.required],
      to_date: ["", Validators.required],
    });
  }

  onSubmit() {
    if (this.wageMonthForm.invalid) return;

    this.wageMonthService.initWageMonth(this.wageMonthForm.value)
      .subscribe(data => {
        console.log(data)
        this.dialogRef.close();
        this.snackbar.open("Successfully initialized wage month", "Dismiss", {
          duration: 1600
        });
      })
  }

  get from_date() {
    return this.wageMonthForm.get('from_date')
  }

  get to_date() {
    return this.wageMonthForm.get('to_date')
  }
}

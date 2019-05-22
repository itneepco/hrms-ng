import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TrainingInstitute } from '../../../models/training';
import { TrainingInstituteService } from '../../../services/training-institute.service';


@Component({
  selector: 'app-training-institute-form',
  templateUrl: './training-institute-form.component.html',
  styleUrls: ['./training-institute-form.component.scss']
})
export class TrainingInstituteFormComponent implements OnInit {
  instituteForm: FormGroup;
  trainingInstitute: TrainingInstitute;
  isLoading = false;

  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<TrainingInstituteFormComponent>,
    private instituteService: TrainingInstituteService) { }

  ngOnInit() {
    this.trainingInstitute = this.data ? this.data : null;
    this.initForm();
  }

  initForm() {
    this.instituteForm = this.fb.group({
      name: [this.trainingInstitute ? this.trainingInstitute.name : '', Validators.required],
      address: this.trainingInstitute ? this.trainingInstitute.address : '',
      city: this.trainingInstitute ? this.trainingInstitute.city : '',
      state: this.trainingInstitute ? this.trainingInstitute.state : '',
      country: this.trainingInstitute ? this.trainingInstitute.country : '',
      pin: this.trainingInstitute ? this.trainingInstitute.pin : '',
      website: this.trainingInstitute ? this.trainingInstitute.website : '',
      contact_person: this.trainingInstitute ? this.trainingInstitute.contact_person : '',
      contact_no: [this.trainingInstitute ? this.trainingInstitute.contact_no : '', [Validators.pattern('[0-9]{10}')]],
      contact_no2: [this.trainingInstitute ? this.trainingInstitute.contact_no2 : '', [Validators.pattern('[0-9]{10}')]],
    });
  }

  onSubmit() {
    if (this.instituteForm.invalid) { return; }

    console.log(this.instituteForm.value);
    this.isLoading = true;
    if (this.trainingInstitute && this.trainingInstitute.id) {
      this.instituteService.editTrainingInstitute(this.trainingInstitute.id, this.instituteForm.value)
      .subscribe((newValue: TrainingInstitute) => {
        this.isLoading = false;
        this.snackbar.open('Successfully updated the institute record', 'Dismiss', {
          duration: 1600
        });
        this.dialogRef.close(newValue);
      }, (error) => this.isLoading = false);
    } else {
      this.instituteService.addTrainingInstitute(this.instituteForm.value)
      .subscribe((value: TrainingInstitute) => {
        this.isLoading = false;
        this.snackbar.open('Successfully added the institute record', 'Dismiss', {
          duration: 1600
        });
        this.dialogRef.close(value);
      }, (error) => this.isLoading = false);
    }

  }

  get name() {
    return this.instituteForm.get('name');
  }

  get address() {
    return this.instituteForm.get('address');
  }

  get city() {
    return this.instituteForm.get('city');
  }

  get state() {
    return this.instituteForm.get('state');
  }

  get country() {
    return this.instituteForm.get('country');
  }

  get pin() {
    return this.instituteForm.get('pin');
  }

  get website() {
    return this.instituteForm.get('website');
  }

  get contact_person() {
    return this.instituteForm.get('contact_person');
  }

  get contact_no() {
    return this.instituteForm.get('contact_no');
  }

  get contact_no2() {
    return this.instituteForm.get('contact_no2');
  }
}

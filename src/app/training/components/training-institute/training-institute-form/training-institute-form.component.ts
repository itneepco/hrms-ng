import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { TrainingInstituteService } from '../../../services/training-institute.service';
import { TrainingInstitute } from '../../../models/training';

@Component({
  selector: 'app-training-institute-form',
  templateUrl: './training-institute-form.component.html',
  styleUrls: ['./training-institute-form.component.scss']
})
export class TrainingInstituteFormComponent implements OnInit {
  instituteForm: FormGroup
  trainingInstitute: TrainingInstitute
  isLoading: boolean = false

  constructor(private fb: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) private data: any,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<TrainingInstituteFormComponent>,
    private instituteService: TrainingInstituteService) { }

  ngOnInit() {
    this.trainingInstitute = this.data ? this.data : null
    this.initForm()
  }

  initForm() {
    this.instituteForm = this.fb.group({
      name: [this.trainingInstitute ? this.trainingInstitute.name : '', Validators.required],
      address: this.trainingInstitute ? this.trainingInstitute.address : '',
      website: this.trainingInstitute ? this.trainingInstitute.website : '',
      contact_no: [this.trainingInstitute ? this.trainingInstitute.contact_no : '', [Validators.pattern('[0-9]{10}')]],
      contact_person: this.trainingInstitute ? this.trainingInstitute.contact_person : ''
    })
  }

  onSubmit() {
    if(this.instituteForm.invalid) return

    console.log(this.instituteForm.value)
    this.isLoading = true
    if(this.trainingInstitute && this.trainingInstitute.id) {
      this.instituteService.editTrainingInstitute(this.trainingInstitute.id, this.instituteForm.value)
      .subscribe((newValue: TrainingInstitute) => {
        this.isLoading = false
        this.snackbar.open("Successfully updated the institute record", "Dismiss", {
          duration: 1600
        }) 
        this.dialogRef.close(newValue)
      }, (error) => this.isLoading = false)
    }
    else {
      this.instituteService.addTrainingInstitute(this.instituteForm.value)
      .subscribe((value: TrainingInstitute) => {
        this.isLoading = false
        this.snackbar.open("Successfully added the institute record", "Dismiss", {
          duration: 1600
        }) 
        this.dialogRef.close(value)
      }, (error) => this.isLoading = false)
    }
    
  }

  get name() {
    return this.instituteForm.get('name')
  }

  get address() {
    return this.instituteForm.get('address')
  }

  get website() {
    return this.instituteForm.get('website')
  }

  get contact_no() {
    return this.instituteForm.get('contact_no')
  }

  get contact_person() {
    return this.instituteForm.get('contact_person')
  }
}

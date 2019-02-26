import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { EXTERNAL_TRAINING } from '../../models/training-global-codes';
import { AuthService } from './../../../auth/services/auth.service';
import { TrainingInfo } from './../../models/training';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {
  feedbackForm: FormGroup

  constructor(private fb: FormBuilder,
    private auth: AuthService, 
    public dialogRef: MatDialogRef<FeedbackFormComponent>,
    @Inject(MAT_DIALOG_DATA) public training: TrainingInfo) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.feedbackForm = this.fb.group({
      emp_code: this.auth.currentUser.emp_code,
      ta_da_incurred: [''],
      comments: ['', Validators.required],
      duration_rating: ['', Validators.required],
      content_rating: ['', Validators.required],
      methodology_rating: ['', Validators.required],
      admin_service_rating: ['', Validators.required],
      overall_utility_rating: ['', Validators.required],
    })
  }

  submitFeedback() {
    
  }

  isExternal() {
    return this.training.training_type == EXTERNAL_TRAINING 
  }
}

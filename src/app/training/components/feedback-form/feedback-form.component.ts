import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    @Inject(MAT_DIALOG_DATA) public training: TrainingInfo) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.feedbackForm = this.fb.group({
      emp_code: this.auth.currentUser.emp_code,
      ta_da_incurred: ['', Validators.required],
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
}

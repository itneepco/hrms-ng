import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EXTERNAL_TRAINING } from '../../models/training-global-codes';
import { AuthService } from './../../../auth/services/auth.service';
import { TrainingFeedback, TrainingInfo } from './../../models/training';
import { FeedbackService } from './../../services/feedback.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {
  feedbackForm: FormGroup
  isLoading: boolean = false
  feedback: TrainingFeedback
  topicRatings = []

  constructor(private fb: FormBuilder,
    private auth: AuthService, 
    private feedbackService: FeedbackService,
    private snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<FeedbackFormComponent>,
    @Inject(MAT_DIALOG_DATA) public training: TrainingInfo) { }

  ngOnInit() {
    this.feedback = this.training.training_feedbacks.find(feed => 
      feed.emp_code == this.auth.currentUser.emp_code)
    // console.log(this.feedback)
    
    this.training.training_topics.forEach(topic => {
      this.topicRatings.push(this.fb.group({
        rating: [ '4', Validators.required ],
        emp_code: this.auth.currentUser.emp_code,
        training_topic_id: [ topic.id ]
      }))
    })

    this.initForm()
  }

  initForm() {
    this.feedbackForm = this.fb.group({
      emp_code: this.auth.currentUser.emp_code,
      ta_da_incurred: [this.feedback ? this.feedback.ta_da_incurred.toString() : ''],
      comments: [this.feedback ? this.feedback.comments.toString() : '', Validators.required],
      duration_rating: [this.feedback ? this.feedback.duration_rating.toString() : '', Validators.required],
      content_rating: [this.feedback ? this.feedback.content_rating.toString() : '', Validators.required],
      methodology_rating: [this.feedback ? this.feedback.methodology_rating.toString() : '', Validators.required],
      admin_service_rating: [this.feedback ? this.feedback.admin_service_rating.toString() : '', Validators.required],
      overall_utility_rating: [this.feedback ? this.feedback.overall_utility_rating.toString() : '', Validators.required],
      topic_ratings: this.fb.array(this.topicRatings),
    })
  }

  submitFeedback() {
    if(this.feedbackForm.invalid) return

    console.log(this.feedbackForm.value)
    this.isLoading = true
    
    if(this.feedback && this.feedback.id) {
      this.feedbackService.editFeedback(this.training.id, this.feedback.id, this.feedbackForm.value)
      .subscribe((data: TrainingFeedback) => {
        this.isLoading = false
        //find the index of old feedback before update
        let index = this.training.training_feedbacks.findIndex(data => data.id == this.feedback.id)
        this.training.training_feedbacks[index] = data // Replace with the updated value
        this.dialogRef.close()
        this.snackbar.open("Successfully updated the feedback", "Dismiss", { duration: 1600 })
      }, error => {
        this.isLoading = false
      })
    } 
    else {
      this.feedbackService.addFeedback(this.training.id, this.feedbackForm.value)
      .subscribe((data: TrainingFeedback) => {
        this.isLoading = false
        this.training.training_feedbacks.push(data)
        this.dialogRef.close()
        this.snackbar.open("Successfully submitted the feedback", "Dismiss", { duration: 1600 })
      }, error => {
        this.isLoading = false
      })
    }
  }

  isExternal() {
    return this.training.training_type == EXTERNAL_TRAINING 
  }

  get comments() {
    return this.feedbackForm.get('comments')
  }

  get duration_rating() {
    return this.feedbackForm.get('duration_rating')
  }

  get content_rating() {
    return this.feedbackForm.get('content_rating')
  }

  get methodology_rating() {
    return this.feedbackForm.get('methodology_rating')
  }

  get admin_service_rating() {
    return this.feedbackForm.get('admin_service_rating')
  }

  get overall_utility_rating() {
    return this.feedbackForm.get('overall_utility_rating')
  }

  get topic_ratings(): FormArray {
    return this.feedbackForm.get('topic_ratings') as FormArray
  }
}

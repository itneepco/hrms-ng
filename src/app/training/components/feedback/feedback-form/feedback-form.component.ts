import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../../../auth/services/auth.service';
import { TrainingFeedback, TrainingInfo } from '../../../models/training';
import { EXTERNAL_TRAINING } from '../../../models/training-global-codes';
import { FeedbackService } from '../../../services/feedback.service';
import { MyFeedbackStatusService } from './../../../services/my-feedback-status.service';

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
    private myFeedbackStatus: MyFeedbackStatusService,
    public dialogRef: MatDialogRef<FeedbackFormComponent>,
    @Inject(MAT_DIALOG_DATA) public training: TrainingInfo) { }

  ngOnInit() {
    this.feedback = this.training.training_feedbacks.find(feed => 
      feed.emp_code == this.auth.currentUser.emp_code)
    console.log(this.feedback)
    
    this.training.training_topics.forEach(topic => {
      this.topicRatings.push(this.fb.group({
        rating: [ topic.rating ? topic.rating.toString() : '', Validators.required ],
        emp_code: this.auth.currentUser.emp_code,
        training_topic_id: [ topic.id ],
        topic_name: topic.topic_name,
        faculty_name: topic.faculty_name
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
      .subscribe((myFeedback: TrainingFeedback) => {
        console.log(myFeedback)
        this.isLoading = false
        //find the index of old feedback before update
        let index = this.training.training_feedbacks.findIndex(data => data.id == this.feedback.id)
        this.training.training_feedbacks[index] = myFeedback // Replace with the updated value
        this.training.training_topics = this.topic_ratings.value

        this.dialogRef.close()
        this.snackbar.open("Successfully updated the feedback", "Dismiss", { duration: 1600 })
      }, error => {
        this.isLoading = false
      })
    } 
    else {
      this.feedbackService.addFeedback(this.training.id, this.feedbackForm.value)
      .subscribe((myFeedback: TrainingFeedback) => {
        this.isLoading = false
        this.training.training_feedbacks.push(myFeedback)
        this.training.training_topics = this.topic_ratings.value
        
        this.dialogRef.close()
        this.myFeedbackStatus.update(true)
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

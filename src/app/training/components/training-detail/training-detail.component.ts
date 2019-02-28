import { TRAINING_COMPLETED, TRAINING_PUBLISHED } from './../../models/training-global-codes';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

import { TrainingInfo } from '../../models/training';
import { TrainingService } from '../../services/training.service';
import { TainingTopic, Participant, TrainingAttendance } from './../../models/training';
import { TrainingParticipantService } from './../../services/training-participant.service';

@Component({
  selector: 'app-training-detail',
  templateUrl: './training-detail.component.html',
  styleUrls: ['./training-detail.component.scss']
})
export class TrainingDetailComponent implements OnInit {
  step: number = 0
  topicColumns = ["sl", "topic", "faculty"]  
  attendance: TrainingAttendance[] = []
  participantColumns = []

  training: TrainingInfo
  isAdminPage: boolean
  training_completed = TRAINING_COMPLETED
  training_published = TRAINING_PUBLISHED
  
  topics = new MatTableDataSource<TainingTopic>([])
  participants = new MatTableDataSource<Participant>([])
  feedbacks = []

  constructor(@Inject(MAT_DIALOG_DATA) public data, 
    public trainingService: TrainingService,
    private snackbar: MatSnackBar,
    private participantService: TrainingParticipantService) {}

  ngOnInit() {
    this.training = this.data.training
    this.isAdminPage = this.data.isAdminPage
    this.topics.data = this.training.training_topics
    this.participants.data = this.training.training_participants
    // this.feedbacks = this.training.training_feedbacks

    if(this.data.isAdminPage) {
      this.participantColumns = ["mark", "sl", "emp_code", "name", "designation", "project"]
    } else {
      this.participantColumns = ["sl", "emp_code", "name", "designation", "project"]
    }
  }

  setStep(index: number) {
    this.step = index;
  }

  markParticipant(event, participant: Participant) {
    let temp = this.attendance.find(data => data.emp_code == participant.emp_code)

    if(event.checked) {
      if(temp) return temp.present = true
      
      this.attendance.push({ emp_code: participant.emp_code, present: true })
    } 
    else {
      if(temp) return temp.present = false
      
      this.attendance.push({ emp_code: participant.emp_code, present: false })
    }  
  }

  markAsPresent() {
    console.log(this.attendance)
    if(this.attendance.length < 1) return
    
    this.participantService.markPresent(this.training.id, this.attendance)
    .subscribe(() => {
      this.snackbar.open("Successfully marked participants as present", "Dismiss", {
        duration: 1600
      })
    })
  }

  markTrainingCompleted() {
    this.trainingService.markTrainingCompleted(this.training.id)
    .subscribe(() => {
      this.training.status = TRAINING_COMPLETED
      this.snackbar.open("Successfully marked the training as completed", "Dismiss", {
        duration: 1600
      })
    })
  }
}

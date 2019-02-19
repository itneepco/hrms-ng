import { MatTableDataSource } from '@angular/material/table';
import { InHouseTainingTopic, Participant } from './../../models/training';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { TrainingInfo } from '../../models/training';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-training-detail',
  templateUrl: './training-detail.component.html',
  styleUrls: ['./training-detail.component.scss']
})
export class TrainingDetailComponent implements OnInit {
  step: number = 0
  topicColumns = ["sl", "topic", "faculty"]  
  participantColumns = ["sl", "emp_code", "name", "designation", "grade", "project"]
  topics = new MatTableDataSource<InHouseTainingTopic>([])
  participants = new MatTableDataSource<Participant>([])

  constructor(@Inject(MAT_DIALOG_DATA) public training: TrainingInfo, 
    public trainingService: TrainingService,
    private dialogRef: MatDialogRef<TrainingDetailComponent>) {}

  ngOnInit() {
    this.topics.data = this.training.training_topics
    this.participants.data = this.training.training_participants  
  }

  setStep(index: number) {
    this.step = index;
  }
}

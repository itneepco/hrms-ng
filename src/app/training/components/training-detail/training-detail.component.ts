import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { saveAs } from 'file-saver';

import { TrainingService } from '../../services/training.service';
import {
  Participant,
  TrainingAttendance,
  TrainingFeedback,
  TrainingInfo,
  TrainingInstitute,
  TrainingTopic,
} from './../../models/training';
import { EXTERNAL_TRAINING, TRAINING_COMPLETED, TRAINING_PUBLISHED } from './../../models/training-global-codes';
import { TrainingParticipantService } from './../../services/training-participant.service';

@Component({
  selector: 'app-training-detail',
  templateUrl: './training-detail.component.html',
  styleUrls: ['./training-detail.component.scss']
})
export class TrainingDetailComponent implements OnInit {
  step = 0;
  topicColumns = ['sl', 'topic', 'faculty', 'rating'];
  attendance: TrainingAttendance[] = [];
  participantColumns = [];
  trainingInstitute: TrainingInstitute;
  training: TrainingInfo;
  isAdminPage: boolean;
  isProfilePage: boolean;
  training_completed = TRAINING_COMPLETED;
  training_published = TRAINING_PUBLISHED;

  topics = new MatTableDataSource<TrainingTopic>([]);
  participants = new MatTableDataSource<Participant>([]);
  feedbacks = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public trainingService: TrainingService,
    private snackbar: MatSnackBar,
    @Inject('BaseURL') public BaseURL,
    private participantService: TrainingParticipantService) {}

  ngOnInit() {
    this.training = this.data.training;
    this.isAdminPage = this.data.isAdminPage;
    this.isProfilePage = this.data.isProfilePage;
    this.topics.data = this.training.training_topics;
    this.participants.data = this.training.training_participants;
    this.feedbacks = this.training.training_feedbacks;

    if (this.training.training_type === EXTERNAL_TRAINING) {
      this.trainingService.getTrainingInstitute(this.training.training_institute_id)
        .subscribe(data => this.trainingInstitute = data);
    }

    if (this.isAdminPage) {
      this.participantColumns = ['mark', 'sl', 'emp_code', 'name', 'designation', 'project'];
    } else if (this.isProfilePage) {
      this.participantColumns = ['name', 'designation',  'grade', 'project', 'attendance'];
    } else {
      this.participantColumns = ['sl', 'emp_code', 'name', 'designation', 'project'];
      this.topicColumns = ['sl', 'topic', 'faculty'];
    }
  }

  setStep(index: number) {
    this.step = index;
  }

  markParticipant(event, participant: Participant) {
    const temp = this.attendance.find(data => data.emp_code == participant.emp_code);

    if (event.checked) {
      if (temp) { return temp.present = true; }

      this.attendance.push({ emp_code: participant.emp_code, present: true });
    } else {
      if (temp) { return temp.present = false; }

      this.attendance.push({ emp_code: participant.emp_code, present: false });
    }
  }

  markAsPresent() {
    console.log(this.attendance);
    if (this.attendance.length < 1) { return; }

    this.participantService.markPresent(this.training.id, this.attendance)
    .subscribe(() => {
      this.snackbar.open('Successfully marked participants as present', 'Dismiss', {
        duration: 1600
      });
    });
  }

  markTrainingCompleted() {
    this.trainingService.markTrainingCompleted(this.training.id)
    .subscribe(() => {
      this.training.status = TRAINING_COMPLETED;
      this.snackbar.open('Successfully marked the training as completed', 'Dismiss', {
        duration: 1600
      });
    });
  }

  calculateRating(feedback: TrainingFeedback) {
    const sum: number = feedback.admin_service_rating +
        feedback.content_rating + feedback.duration_rating +
        feedback.methodology_rating + feedback.overall_utility_rating;
    return (sum / 5);
  }

  getEmployeeDetail(feedback: TrainingFeedback) {
    const emp = this.participants.data.find(participant => participant.emp_code == feedback.emp_code);
    if (!emp) { return ''; }

    return `${emp.name}, ${emp.designation}, ${emp.project}`;
  }

  get averageRating() {
    const sum = {
      duration: 0,
      methodology: 0,
      content: 0,
      admin_service: 0,
      overall_utility: 0
    };

    this.feedbacks.forEach((data: TrainingFeedback) => {
      sum.duration += data.duration_rating;
      sum.methodology += data.methodology_rating;
      sum.content += data.content_rating;
      sum.admin_service += data.admin_service_rating;
      sum.overall_utility += data.overall_utility_rating;
    });

    const total = this.feedbacks.length;
    return {
      duration: sum.duration / total,
      methodology: sum.methodology / total,
      content: sum.content / total,
      admin_service: sum.admin_service / total,
      overall_utility: sum.overall_utility / total
    };
  }

  getAttendance(participant: Participant) {
    if (participant.present) {
      return 'Present';
    } else {
      return 'Absent';
    }
  }

  downloadOrder(id: number) {
    this.trainingService.downloadOrder(id)
      .subscribe(data => {
        console.log(data);
        saveAs(data, `order${id}.pdf`);
      });
  }
}

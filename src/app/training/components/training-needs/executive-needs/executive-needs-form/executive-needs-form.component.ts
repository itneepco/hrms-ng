import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../../../../auth/services/auth.service';
import { NEED_TYPES, TRAINING_DURATIONS } from '../../../../models/training-global-codes';
import { ExecutiveNeed, TrainingLabel, TrainingNeedInfo } from '../../../../models/training-needs';
import { ExecutiveNeedService } from '../../../../services/executive-need.service';
import { TrainingService } from '../../../../services/training.service';

@Component({
  selector: 'app-executive-needs-form',
  templateUrl: './executive-needs-form.component.html',
  styleUrls: ['./executive-needs-form.component.scss']
})
export class ExecutiveNeedsFormComponent implements OnInit {
  needForm: FormGroup;
  need_types = NEED_TYPES;
  durations = TRAINING_DURATIONS;
  trainigLabels: TrainingLabel[];
  executiveNeed: ExecutiveNeed;
  needInfo: TrainingNeedInfo;
  isSubmitting = false;

  constructor(private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private trainingService: TrainingService,
    private executiveNeedService: ExecutiveNeedService,
    private dialogRef: MatDialogRef<ExecutiveNeedsFormComponent>,
    private snackbar: MatSnackBar,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.needInfo = this.data.needInfo;
    this.executiveNeed = this.data.need ? this.data.need : null;
    this.trainingService.getTrainingLabels()
      .subscribe(data => {
        console.log(data)
        this.trainigLabels = data;
      });
    this.initForm();
  }

  initForm() {
    this.needForm = this.fb.group({
      need_type: [this.executiveNeed ? this.executiveNeed.need_type : '', Validators.required],
      duration: [this.executiveNeed ? this.executiveNeed.duration : '', Validators.required],
      training_label_id: [this.executiveNeed ? this.executiveNeed.training_label.id : '', Validators.required],
      topic: [this.executiveNeed ? this.executiveNeed.topic : '', Validators.required],
      emp_code: this.auth.currentUser.emp_code,
      year: this.needInfo.year,
    });
  }

  onSubmit() {
    if (this.needForm.invalid) { return; }

    console.log(this.needForm.value);
    this.isSubmitting = true;
    if (this.executiveNeed && this.executiveNeed.id) {
      this.executiveNeedService.editExecutiveNeed(this.executiveNeed.id, this.needForm.value)
      .subscribe((newValue: ExecutiveNeed) => {
        this.isSubmitting = false;
        this.snackbar.open('Successfully updated the executive need record', 'Dismiss', {
          duration: 1600
        });
        this.dialogRef.close(newValue);
      }, (error) => this.isSubmitting = false);
    } else {
      this.executiveNeedService.addExecutiveNeed(this.needForm.value)
      .subscribe((value: ExecutiveNeed) => {
        this.isSubmitting = false;
        this.snackbar.open('Successfully added the executive need record', 'Dismiss', {
          duration: 1600
        });
        this.dialogRef.close(value);
      }, (error) => this.isSubmitting = false);
    }
  }

  get need_type() {
    return this.needForm.get('need_type');
  }

  get duration() {
    return this.needForm.get('duration');
  }

  get training_label_id() {
    return this.needForm.get('training_label_id');
  }

  get topic() {
    return this.needForm.get('topic');
  }

}

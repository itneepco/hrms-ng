import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { InHouseTainingTopic, Participant } from '../../models/training';
import { IN_HOUSE_TRAINING } from '../../models/training-global-codes';
import { EXTERNAL_TRAINING } from './../../models/training-global-codes';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  trainingInfo: FormGroup;
  inHouseTrainingTopic: FormGroup;
  participantColumns = ["sl", "name", "designation", "project", "actions"]
  topicColumns = ["sl", "topic", "faculty", "actions"]
  
  participantDataSource: MatTableDataSource<Participant>[]
  topicDataSource: MatTableDataSource<InHouseTainingTopic>[]

  inhouse_trn = IN_HOUSE_TRAINING
  external_trn = EXTERNAL_TRAINING

  training_types = [
    {name: "In-House Training", code: IN_HOUSE_TRAINING}, 
    {name: "External Training", code: EXTERNAL_TRAINING}
  ]

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.trainingInfo = this._formBuilder.group({
      course_title: ['', Validators.required],
      from_date: ['', Validators.required],
      to_date: ['', Validators.required],
      venue: ['', Validators.required],
      objective: ['', Validators.required],
      training_type: ['', Validators.required],
      training_institute_id: [''],
    });

    this.inHouseTrainingTopic = this._formBuilder.group({
      training_info_id: [''],
      topic: ['', Validators.required],
      faculty_name: ['', Validators.required],
    });

    this.participantDataSource = []
    this.topicDataSource = []
  }

  get training_type() {
    return this.trainingInfo.get('training_type')
  }
}

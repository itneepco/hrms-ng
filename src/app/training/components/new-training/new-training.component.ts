import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { InHouseTainingTopic, Participant } from '../../models/training';
import { IN_HOUSE_TRAINING } from '../../models/training-global-codes';
import { EXTERNAL_TRAINING } from './../../models/training-global-codes';
import { EmployeeService } from '../../../shared/services/employee.service';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  trainingInfo: FormGroup;
  inHouseTrainingTopic: FormGroup;
  first_name: FormControl = new FormControl();
  firstNameSubs: Subscription;
  searchResult = [];

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

  constructor(private _formBuilder: FormBuilder, 
    private employeeService: EmployeeService) {}

  ngOnInit() {
    this.initializeForm()

    this.participantDataSource = []
    this.topicDataSource = []

    this.firstNameSubs = this.first_name.valueChanges.pipe(debounceTime(500)).subscribe(name => {
      if(!name) return
      if(name.length < 1) return
      
      this.employeeService.searchEmployeeByName(name)
        .subscribe(response => {
          this.searchResult = response
          console.log(response)
        })
    })
  }

  initializeForm() {
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
  }

  get training_type() {
    return this.trainingInfo.get('training_type')
  }

  getFullName(item) {
    return `${item.first_name} ${item.middle_name} ${item.last_name}, ${item.designation}, ${item.emp_code}` 
  }

  ngOnDestroy() {
    this.firstNameSubs.unsubscribe();
  }
}

import { HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { EmployeeService } from '../../../shared/services/employee.service';
import { InHouseTainingTopic, Participant } from '../../models/training';
import { IN_HOUSE_TRAINING } from '../../models/training-global-codes';
import { TrainingService } from '../../services/training.service';
import { EXTERNAL_TRAINING } from './../../models/training-global-codes';
import { TrainingInstituteService } from './../../services/training-institute.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  trngInfoForm: FormGroup;
  trngTopicForm: FormGroup;

  full_name: FormControl = new FormControl();
  fullNameSubs: Subscription;
  
  searchResult = [];

  participantColumns = ["sl", "emp_code", "name", "designation", "project", "actions"]
  topicColumns = ["sl", "topic", "faculty", "actions"]  
  participants = new MatTableDataSource<Participant>([])
  topics = new MatTableDataSource<InHouseTainingTopic>([])

  //training types
  inhouse_trn = IN_HOUSE_TRAINING
  external_trn = EXTERNAL_TRAINING
  training_types = [
    {name: "In-House Training", code: IN_HOUSE_TRAINING}, 
    {name: "External Training", code: EXTERNAL_TRAINING}
  ]

  //training order file upload
  selectedFile: File = null;
  progressValue = 0;

  //Training Institutes
  trg_institutes = []

  constructor(private _formBuilder: FormBuilder, 
    private trainingService: TrainingService,
    private trgInstituteService: TrainingInstituteService,
    private employeeService: EmployeeService) {}

  ngOnInit() {
    this.initializeForm()

    this.fullNameSubs = this.full_name.valueChanges.pipe(debounceTime(500)).subscribe(name => {
      if(!name) return
      if(name.length < 1) return
      
      this.employeeService.searchEmployeeByName(name)
        .subscribe(response => {
          this.searchResult = response
        })
    })

    this.trgInstituteService.getTrainingInstitutes()
      .subscribe(data => {
        this.trg_institutes = data
        console.log(data)
      })
  }

  initializeForm() {
    this.trngInfoForm = this._formBuilder.group({
      course_title: ['', Validators.required],
      from_date: ['', Validators.required],
      to_date: ['', Validators.required],
      venue: ['', Validators.required],
      objective: ['', Validators.required],
      training_type: ['', Validators.required],
      training_institute_id: [''],
    });

    this.trngTopicForm = this._formBuilder.group({
      topic_name: ['', Validators.required],
      faculty_name: ['', Validators.required],
    });
  }

  selectFile(event) {
    this.selectedFile = event.target.files[0]
  }

  uploadFile() {
    if(!this.selectedFile) return

    let data = {
      code: '1',
      day: (new Date('2019-02-06')).toDateString(),
      report: this.selectedFile
    }

    this.trainingService.upload(data)
      .subscribe(event => {
        if(event.type == HttpEventType.UploadProgress) {
          this.progressValue = Math.round((event.loaded / event.total) * 100)
        } 
        else if(event.type == HttpEventType.Response) {
          console.log(event.body)
        }
      }, error => {
        console.log(error)
      })
  }

  clear() {
    this.full_name.reset()
  }

  removeParticipant(index: number) {
    let temp = this.participants.data
    temp.splice(index, 1)
    this.participants.data = temp
  }

  addParticipant(event) {
    let full_info = event.source.viewValue.split(',')
    let participant = {} as Participant

    participant.name = full_info[0].trim()
    participant.emp_code = full_info[1].trim()
    participant.designation = full_info[2].trim()
    participant.project = full_info[3].trim()

    let temp = this.participants.data
    temp.push(participant)
    this.participants.data = temp
    this.clear()
  }


  addTopic() {
    if(this.trngTopicForm.invalid) return

    let topic = {} as InHouseTainingTopic
    topic.faculty_name = this.faculty_name.value
    topic.topic_name = this.topic_name.value

    let temp = this.topics.data
    temp.push(topic)
    this.topics.data = temp

    this.trngTopicForm.reset()
  }

  removeTopic(index: number) {
    let temp = this.topics.data
    temp.splice(index, 1)
    this.topics.data = temp
  }

  get training_type() {
    return this.trngInfoForm.get('training_type')
  }

  getFullName(item) {
    return `${item.first_name} ${item.middle_name} ${item.last_name}, ${item.emp_code}` 
  }

  getOtherInfo(item) {
    return `${item.designation}, ${item.project}` 
  }

  get faculty_name() {
    return this.trngTopicForm.get('faculty_name')
  }

  get topic_name() {
    return this.trngTopicForm.get('topic_name')
  }

  ngOnDestroy() {
    this.fullNameSubs.unsubscribe();
  }
}

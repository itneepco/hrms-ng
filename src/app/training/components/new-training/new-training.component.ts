import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { EmployeeService } from '../../../shared/services/employee.service';
import { InHouseTainingTopic, Participant, TrainingInfo } from '../../models/training';
import { IN_HOUSE_TRAINING, TRAINING_TYPES } from '../../models/training-global-codes';
import { TrainingService } from '../../services/training.service';
import { EXTERNAL_TRAINING } from './../../models/training-global-codes';
import { DataService } from './../../services/data.service';
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
  inhouseTrn = IN_HOUSE_TRAINING
  externalTrn = EXTERNAL_TRAINING
  trainingTypes = TRAINING_TYPES

  //training order file upload
  selectedFile: File = null;
  progressValue = 0;

  //Training Institutes
  trgInstitutes = [];

  //Saving form flag
  saving = false;

  //Training Info
  trainingInfo: TrainingInfo = null

  constructor(private _formBuilder: FormBuilder, 
    private trainingService: TrainingService,
    private trgInstituteService: TrainingInstituteService,
    private dataService: DataService,
    private employeeService: EmployeeService) {}

  ngOnInit() {
    // Initialize trainining info from the dataService (for edit only)
    this.trainingInfo = this.dataService.trainingData
    this.dataService.trainingData = null

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
      .subscribe(data => this.trgInstitutes = data)
  }

  initializeForm() {
    this.trngInfoForm = this._formBuilder.group({
      course_title: [this.trainingInfo ? this.trainingInfo.course_title : '', Validators.required],
      from_date: [this.trainingInfo ? this.trainingInfo.from_date : '', Validators.required],
      to_date: [this.trainingInfo ? this.trainingInfo.to_date : '', Validators.required],
      venue: [this.trainingInfo ? this.trainingInfo.venue : '', Validators.required],
      objective: [this.trainingInfo ? this.trainingInfo.objective : '', Validators.required],
      training_type: [this.trainingInfo ? this.trainingInfo.training_type : '', Validators.required],
      training_institute_id: [this.trainingInfo ? this.trainingInfo.training_institute_id : ''],
    });

    this.trngTopicForm = this._formBuilder.group({
      topic_name: ['', Validators.required],
      faculty_name: ['', Validators.required],
    });
  }

  selectFile(event) {
    this.selectedFile = event.target.files[0]
  }

  // uploadFile() {
  //   if(!this.selectedFile) return

  //   let data = {
  //     code: '1',
  //     day: (new Date('2019-02-06')).toDateString(),
  //     report: this.selectedFile
  //   }

  //   this.trainingService.upload(data)
  //     .subscribe(event => {
  //       if(event.type == HttpEventType.UploadProgress) {
  //         this.progressValue = Math.round((event.loaded / event.total) * 100)
  //       } 
  //       else if(event.type == HttpEventType.Response) {
  //         console.log(event.body)
  //       }
  //     }, error => {
  //       console.log(error)
  //     })
  // }

  clear() {
    this.full_name.reset()
  }

  clearTrainingInfo() {
    this.trainingInfo = null
    this.trngInfoForm.reset()
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


  saveTrainingInfo(stepper: MatStepper) {
    if(this.trngInfoForm.invalid) return
    
    this.saving = true
    if(this.trainingInfo) {
      this.trainingService.editTrainingInfo(this.trainingInfo.id, this.trngInfoForm.value)
        .subscribe((info: TrainingInfo) => {
          console.log(info)
          this.saving = false
          stepper.next()
        })
    }
    else {
      this.trainingService.addTrainingInfo(this.trngInfoForm.value)
        .subscribe((info: TrainingInfo) => {
          console.log(info)
          this.trainingInfo = info
          this.saving = false
          stepper.next()
        })
    }
  }

  //getters for training info form
  get course_title() {
    return this.trngInfoForm.get('course_title')
  }

  get from_date() {
    return this.trngInfoForm.get('from_date')
  }

  get to_date() {
    return this.trngInfoForm.get('to_date')
  }

  get venue() {
    return this.trngInfoForm.get('venue')
  }

  get objective() {
    return this.trngInfoForm.get('objective')
  }

  get training_type() {
    return this.trngInfoForm.get('training_type')
  }

  //In house training topic
  get faculty_name() {
    return this.trngTopicForm.get('faculty_name')
  }

  get topic_name() {
    return this.trngTopicForm.get('topic_name')
  }

  getFullName(item) {
    return `${item.first_name} ${item.middle_name} ${item.last_name}, ${item.emp_code}` 
  }

  getOtherInfo(item) {
    return `${item.designation}, ${item.project}` 
  }

  ngOnDestroy() {
    this.fullNameSubs.unsubscribe();
  }
}

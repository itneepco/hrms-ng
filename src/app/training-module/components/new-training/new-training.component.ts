import { Location } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { EmployeeService } from '../../../shared/services/employee.service';
import { Participant, TrainingInfo, TrainingTopic } from '../../models/training';
import { IN_HOUSE_TRAINING, TRAINING_CREATED, TRAINING_PUBLISHED, TRAINING_TYPES } from '../../models/training-global-codes';
import { TrainingTopicService } from '../../services/training-topic.service';
import { TrainingService } from '../../services/training.service';
import { EXTERNAL_TRAINING } from './../../models/training-global-codes';
import { DataService } from './../../services/data.service';
import { TrainingInstituteService } from './../../services/training-institute.service';
import { TrainingParticipantService } from './../../services/training-participant.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  trngInfoForm: FormGroup;
  trngTopicForm: FormGroup;

  full_name: FormControl = new FormControl();
  empSearchResult = [];

  // Subscriptions
  fullNameSubs: Subscription;
  trgInfoFormSubs: Subscription;

  participantColumns = ['sl', 'emp_code', 'name', 'designation', 'grade', 'project', 'actions'];
  topicColumns = ['sl', 'topic', 'faculty', 'actions'];
  participants = new MatTableDataSource<Participant>([]);
  topics = new MatTableDataSource<TrainingTopic>([]);

  // training types
  inhouseTrn = IN_HOUSE_TRAINING;
  externalTrn = EXTERNAL_TRAINING;
  trainingTypes = TRAINING_TYPES;
  training_published = TRAINING_PUBLISHED;
  training_created = TRAINING_CREATED;

  // training order file upload
  selectedFile: File = null;
  progressValue = 0;

  // Training Institutes
  trgInstitutes = [];

  // Saving and editing form flag
  isSaving = false;
  isEdited = false;

  // Training Info
  _trainingInfo: TrainingInfo = null;
  _trainingTopic: TrainingTopic = null;

  constructor(private _formBuilder: FormBuilder,
    private trainingService: TrainingService,
    private trgInstituteService: TrainingInstituteService,
    private dataService: DataService,
    private snackbar: MatSnackBar,
    private router: Router,
    private location: Location,
    private trgTopicService: TrainingTopicService,
    private participantService: TrainingParticipantService,
    private employeeService: EmployeeService) {}

  ngOnInit() {
    // Initialize trainining info from the dataService (for update operation only)
    this._trainingInfo = this.dataService.trainingData;
    if (this._trainingInfo) {
      this.dataService.trainingData = null;
      this.topics.data = this._trainingInfo.training_topics;
      this.participants.data = this._trainingInfo.training_participants;
    }
    console.log(this._trainingInfo)
    // Initialize forms
    this.initializeForms();

    this.initEmployeeAutoComplete();
    this.trgInstituteService.getTrainingInstitutes().subscribe(data => this.trgInstitutes = data);
  }

  initEmployeeAutoComplete() {
    this.fullNameSubs = this.full_name.valueChanges.pipe(debounceTime(500)).subscribe(name => {
      if (!name) { return; }
      if (name.length < 1) { return; }

      this.employeeService.searchEmployeeByName(name)
        .subscribe(response => {
          this.empSearchResult = response;
          // console.log(response)
        });
    });
  }

  initializeForms() {
    this.initTrngInfoForm();
    this.initTrngTopicForm();
  }

  initTrngInfoForm() {
    this.trngInfoForm = this._formBuilder.group({
      course_title: [this._trainingInfo ? this._trainingInfo.course_title : '', Validators.required],
      from_date: [this._trainingInfo ? this._trainingInfo.from_date : '', Validators.required],
      to_date: [this._trainingInfo ? this._trainingInfo.to_date : '', Validators.required],
      venue: [this._trainingInfo ? this._trainingInfo.venue : '', Validators.required],
      objective: [this._trainingInfo ? this._trainingInfo.objective : '', Validators.required],
      training_type: [this._trainingInfo ? this._trainingInfo.training_type : '', Validators.required],
      training_institute_id: [this._trainingInfo ? this._trainingInfo.training_institute_id : ''],
    });

    // Check if the training info form has been edited (for update operation only)
    this.trgInfoFormSubs = this.trngInfoForm.valueChanges.subscribe((data) => {
      if (this._trainingInfo) { this.isEdited = true; }
    });
  }

  initTrngTopicForm() {
    this.trngTopicForm = this._formBuilder.group({
      topic_name: [this._trainingTopic ? this._trainingTopic.topic_name : '', Validators.required],
      faculty_name: [this._trainingTopic ? this._trainingTopic.faculty_name : '', Validators.required],
    });
  }

  selectFile(event) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (!this.selectedFile) { return; }

    this.trainingService.uploadOrder(this._trainingInfo.id , this.selectedFile)
      .subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          this.progressValue = Math.round((event.loaded / event.total) * 100);
        } else if (event.type == HttpEventType.Response) {
          this.snackbar.open('Successfully uploaded the training order', 'Dismiss', {
            panelClass: ['blue-snackbar'],
            duration: 2000
          });
        }
      }, error => {
        console.log(error);
        this.progressValue = 0;
        this.snackbar.open('Error!! Please upload only PDF file', 'Dismiss', { duration: 2000 });
      });
  }

  clearEmployeeSearch() {
    this.full_name.reset();
  }

  clearTrainingInfo() {
    this._trainingInfo = null;
    this.trngInfoForm.reset();
  }

  removeParticipant(participant: Participant) {
    const retVal = confirm('Are you sure you want to delete?');
    if (retVal == true) {
      this.participantService.deleteParticipant(this._trainingInfo.id, participant.id)
        .subscribe(() => {
          this.snackbar.open('Successfully removed the participant', 'Dismiss', { duration: 1600 });
        });

      const temp = this.participants.data;
      temp.splice(temp.indexOf(participant), 1);
      this.participants.data = temp;
    }
  }

  addParticipant(event) {
    const full_info = event.source.viewValue.split(',');
    const participant = {} as Participant;

    participant.name = full_info[0].trim();
    participant.emp_code = full_info[1].trim();
    participant.designation = full_info[2].trim();
    participant.grade = full_info[3].trim();
    participant.project = full_info[4].trim();

    this.clearEmployeeSearch();
    // Check if the participant has already been added
    if (this.participants.data.find(el => el.emp_code == participant.emp_code)) { return; }

    this.participantService.addParticipant(this._trainingInfo.id, participant.emp_code)
      .subscribe(data => {
        console.log(data);
        participant.id = data['id'];

        const temp = this.participants.data;
        temp.push(participant);
        this.participants.data = temp;

        this.snackbar.open('Successfully added the participant', 'Dismiss', { duration: 1600 });
      });
  }

  onTrainingTypeChange(event) {
    // set training institute 'required validation' for external type training
    if (event.value == this.externalTrn) {
      this.training_institute_id.setValidators(Validators.required);
    } else {
      this.training_institute_id.clearValidators();
    }
    this.training_institute_id.updateValueAndValidity();
  }

  saveTrainingInfo(stepper: MatStepper) {
    console.log(this.trngInfoForm);
    if (this.trngInfoForm.invalid) { return; }

    this.isSaving = true;
    if (this._trainingInfo) {
      this.trainingService.editTrainingInfo(this._trainingInfo.id, this.trngInfoForm.value)
        .subscribe((info: TrainingInfo) => {
          console.log(info);
          this.isSaving = false;
          this.isEdited = false;
          stepper.next();
        });
    } else {
      this.trainingService.addTrainingInfo(this.trngInfoForm.value)
        .subscribe((info: TrainingInfo) => {
          console.log(info);
          this._trainingInfo = info;
          this.isSaving = false;
          this.isEdited = false;
          stepper.next();
        });
    }
  }

  saveTrainingTopic() {
    if (this.trngTopicForm.invalid) { return; }

    const topic = {} as TrainingTopic;
    topic.faculty_name = this.faculty_name.value;
    topic.topic_name = this.topic_name.value;

    if (this._trainingTopic) {
      this.trgTopicService.editTrainingTopic(this._trainingTopic.training_info_id, this._trainingTopic.id, topic)
      .subscribe((result: TrainingTopic) => {
        const temp = this.topics.data;
        const index = this.topics.data.indexOf(this._trainingTopic);
        temp.splice(index, 1);
        temp.unshift(result);
        this.topics.data = temp;
        this._trainingTopic = null;
        this.snackbar.open('Successfully updated the topic', 'Dismiss', { duration: 1600 });
      });
    } else {
      topic.training_info_id = this._trainingInfo.id;
      this.trgTopicService.addTrainingTopic(this._trainingInfo.id, topic)
      .subscribe((result: TrainingTopic) => {
        const temp = this.topics.data;
        temp.push(result);
        this.topics.data = temp;
        this.snackbar.open('Successfully added the topic', 'Dismiss', { duration: 1600 });
      });
    }

    this.trngTopicForm.reset();
    Object.keys(this.trngTopicForm.controls).forEach((name) => {
      const control = this.trngTopicForm.controls[name];
      control.setErrors(null);
    });
  }

  editTrainingTopic(topic: TrainingTopic) {
    this._trainingTopic = topic;
    // console.log(this._trainingTopic)
    this.initTrngTopicForm();
  }

  removeTrainingTopic(topic: TrainingTopic) {
    const retVal = confirm('Are you sure you want to delete?');
    if (retVal == true) {
      this.trgTopicService.deleteTrainingTopic(this._trainingInfo.id, topic.id)
        .subscribe(data => {
          this.snackbar.open('Successfully removed the topic', 'Dismiss', {
            duration: 1600
          });
        });

      const temp = this.topics.data;
      temp.splice(temp.indexOf(topic), 1);
      this.topics.data = temp;
    }
  }

  // Publish Training
  publishTraining() {
    // Check if training exists and the no of participants is atleast 1
    if (!this._trainingInfo || this.participants.data.length < 1) { return; }

    this.trainingService.publishTraining(this._trainingInfo.id)
    .subscribe(() => {
      this.router.navigate(['training/training-admin']);
      this.snackbar.open('Successfully published the training', 'Dismiss', {
        duration: 1600
      });
    });
  }

  goToManageTrainings() {
    this.router.navigate(['/training/admin-training/manage-training']);
  }

  goBack() {
    this.location.back();
  }

  // getters for training info form
  get course_title() {
    return this.trngInfoForm.get('course_title');
  }

  get from_date() {
    return this.trngInfoForm.get('from_date');
  }

  get to_date() {
    return this.trngInfoForm.get('to_date');
  }

  get venue() {
    return this.trngInfoForm.get('venue');
  }

  get objective() {
    return this.trngInfoForm.get('objective');
  }

  get training_type() {
    return this.trngInfoForm.get('training_type');
  }

  get training_institute_id() {
    return this.trngInfoForm.get('training_institute_id');
  }

  // In house training topic
  get faculty_name() {
    return this.trngTopicForm.get('faculty_name');
  }

  get topic_name() {
    return this.trngTopicForm.get('topic_name');
  }

  getFullName(item) {
    return `${item.first_name} ${item.middle_name} ${item.last_name}, ${item.emp_code}`;
  }

  getOtherInfo(item) {
    return `${item.designation}, ${item.grade}, ${item.project}`;
  }

  ngOnDestroy() {
    this.fullNameSubs.unsubscribe();
    this.trgInfoFormSubs.unsubscribe();
  }
}

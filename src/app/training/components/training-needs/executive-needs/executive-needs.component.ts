import { AuthService } from './../../../../auth/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NEED_TYPES, TRAINING_DURATIONS } from '../../../models/training-global-codes';

@Component({
  selector: 'app-executive-needs',
  templateUrl: './executive-needs.component.html',
  styleUrls: ['./executive-needs.component.scss']
})
export class ExecutiveNeedsComponent implements OnInit {
  needForm: FormGroup
  need_types = NEED_TYPES
  durations = TRAINING_DURATIONS

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.needForm = this.fb.group({
      need_type: ['', Validators.required],
      duration: ['', Validators.required],
      training_label: ['', Validators.required],
      topic: ['', Validators.required],
      emp_code: this.auth.currentUser.emp_code,
      year: '',
    })
  }

  onSubmit() {
    console.log(this.needForm.value)
  } 

  get need_type() {
    return this.needForm.get('need_type')
  }

  get duration() {
    return this.needForm.get('duration')
  }

  get training_label() {
    return this.needForm.get('training_label')
  }

  get topic() {
    return this.needForm.get('topic')
  }
}

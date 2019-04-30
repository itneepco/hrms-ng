import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './../../../../auth/services/auth.service';
import { NEEDS_ACTION_TYPES } from './../../../models/training-global-codes';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit {
  actionForm: FormGroup
  @Input('year') year
  actions = NEEDS_ACTION_TYPES

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.actionForm = this.fb.group({
      workflow_action: ['', Validators.required],
      addressee: '',
      officer_emp_code: this.auth.currentUser.emp_code,
      year: this.year
    })
  }

  onSubmit() {

  }
}

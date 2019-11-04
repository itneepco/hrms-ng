import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { TrainingNeedInfo } from '../../../models/training-needs';
import { NeedsWorkflowService } from '../../../services/needs-workflow.service';
import { AuthService } from './../../../../auth/services/auth.service';
import { CtrlOfficer } from './../../../../shared/models/adressee';
import { HierarchyService } from './../../../../shared/services/hierarchy.service';
import {
  NEEDS_ACTION_TYPES,
  NEEDS_CREATED,
  NEEDS_RETURNED,
  NEEDS_SUBMITTED,
  SUBMIT_NEEDS_ACTION,
} from './../../../models/training-global-codes';
import { Location } from '@angular/common';
import { PendingRequestStatusService } from '../../../services/pending-request-status.service';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit, OnDestroy {
  actionForm: FormGroup;
  ctrlOfficers: CtrlOfficer[];
  @Input('needInfo') needInfo: TrainingNeedInfo;
  subscription: Subscription;
  needs_created = NEEDS_CREATED;
  needs_returned = NEEDS_RETURNED;
  isSubmitting = false;
  actions = [];

  constructor(private fb: FormBuilder,
    private hierarchyService: HierarchyService,
    private needWorkflow: NeedsWorkflowService,
    private pendingRequestStatus: PendingRequestStatusService,
    private location: Location,
    private snackbar: MatSnackBar,
    private auth: AuthService) { }

  ngOnInit() {
    this.initForm();

    if (this.needInfo.status === NEEDS_CREATED || this.needInfo.status === NEEDS_RETURNED) {
      this.actions = SUBMIT_NEEDS_ACTION;
      this.hierarchyService.getParents(this.auth.currentUser.emp_code)
        .subscribe((data: CtrlOfficer[]) => this.ctrlOfficers = data);
    }

    if (this.needInfo.status === NEEDS_SUBMITTED) {
      this.actions = NEEDS_ACTION_TYPES;
    }

    this.subscription = this.workflow_action.valueChanges
      .subscribe((data) => {
        if (data === NEEDS_SUBMITTED) {
          this.addressee.setValidators(Validators.required);
        }
      });
  }

  initForm() {
    this.actionForm = this.fb.group({
      workflow_action: ['', Validators.required],
      addressee: '',
      officer_emp_code: this.auth.currentUser.emp_code,
      remarks: ''
    });
  }

  onSubmit() {
    if (this.actionForm.invalid) { return; }
    console.log(this.actionForm.value);

    this.isSubmitting = true;
    this.needWorkflow.processWorkflow(1, this.actionForm.value)
    .subscribe(
      () => {
        this.isSubmitting = false;
        this.needInfo.status = NEEDS_SUBMITTED;
        this.snackbar.open('Successfully submitted the training needs', 'Dismiss', {
          duration: 1600
        });
        this.location.back();
        this.pendingRequestStatus.update(true);
      },
      (error) => {
        this.isSubmitting = false;
        this.snackbar.open('There was an error submitting the training needs. Please try again', 'Dismiss', {
          duration: 2500
        });
      }
    );
  }

  get addressee() {
    return this.actionForm.get('addressee');
  }

  get workflow_action() {
    return this.actionForm.get('workflow_action');
  }

  getFullName(item) {
    return `${item.first_name} ${item.middle_name} ${item.last_name}, ${item.designation}`;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

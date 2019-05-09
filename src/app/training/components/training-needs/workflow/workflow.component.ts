import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NeedsWorkflowService } from '../../../services/needs-workflow.service';
import { AuthService } from './../../../../auth/services/auth.service';
import { CtrlOfficer } from './../../../../shared/models/adressee';
import { HierarchyService } from './../../../../shared/services/hierarchy.service';
import { SUBMIT_NEEDS_ACTION } from './../../../models/training-global-codes';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit {
  actionForm: FormGroup;
  @Input('year') year;
  actions = SUBMIT_NEEDS_ACTION;
  ctrlOfficers: CtrlOfficer[];
  isSubmitting = false;

  constructor(private fb: FormBuilder,
    private hierarchyService: HierarchyService,
    private needWorkflow: NeedsWorkflowService,
    private snackbar: MatSnackBar,
    private auth: AuthService) { }

  ngOnInit() {
    this.initForm();

    this.hierarchyService.getParents(this.auth.currentUser.emp_code)
      .subscribe((data: CtrlOfficer[]) => this.ctrlOfficers = data);
  }

  initForm() {
    this.actionForm = this.fb.group({
      workflow_action: ['', Validators.required],
      addressee: '',
      officer_emp_code: this.auth.currentUser.emp_code,
      year: this.year
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
        this.snackbar.open('Successfully submitted the training needs', 'Dismiss', {
          duration: 1600
        });
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
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

import { TrainingLabelService } from '../../services/training-label.service';
import { TrainingLabel } from './../../models/training-needs';

@Component({
  selector: 'app-training-label',
  templateUrl: './training-label.component.html',
  styleUrls: ['./training-label.component.scss']
})
export class TrainingLabelComponent implements OnInit {
  dataSource: MatTableDataSource<TrainingLabel>;
  displayedColumns: string[] = ['position', 'name', 'actions'];
  labelForm: FormGroup;
  isSubmitting = false;
  _label: TrainingLabel = {} as TrainingLabel;

  // Pagination variables
  dataLength = 0;
  pageSize = 10;
  pageIndex = 0;

  constructor(private snackbar: MatSnackBar,
    private trainingLabelService: TrainingLabelService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.getTrainingLabels();
    this.initializeForm();
  }

  initializeForm() {
    this.labelForm = this.fb.group({
      name: [this._label ? this._label.name : '', Validators.required]
    });
  }

  onSubmit() {
    if (this.labelForm.invalid) { return; }
    this.isSubmitting = true;
    if (!this._label.id) {
      this.trainingLabelService.addTrainingLabel(this.labelForm.value)
        .subscribe((data: TrainingLabel) => {
          this.isSubmitting = false;
          this.dataSource.data = [data, ...this.dataSource.data]
        }, error => {
          console.log(error);
          this.isSubmitting = false;
        });
    } else {
      this.trainingLabelService.editTrainingLabel(this._label.id, this.labelForm.value)
        .subscribe((data: TrainingLabel) => {
          this.isSubmitting = false;
          const index = this.dataSource.data.indexOf(this._label);
          const temp = this.dataSource.data;
          temp.splice(index, 1);
          temp.unshift(data);
          this.dataSource.data = temp;
        }, error => {
          this.isSubmitting = false;
        });
    }

    this.labelForm.reset();
    Object.keys(this.labelForm.controls).forEach((name) => {
      const control = this.labelForm.controls[name];
      control.setErrors(null);
    });
  }

  onEdit(label: TrainingLabel) {
    this._label = label;
    this.initializeForm();
  }

  onDelete(label: TrainingLabel) {
    const retVal = confirm('Are you sure you want to delete?');
    if (retVal !== true) { return; }

    this.trainingLabelService.deleteTrainingLabel(label.id)
      .subscribe(() => {
        const temp = this.dataSource.data;
        this.dataSource.data = temp.filter(data => data.id !== label.id);
        this.snackbar.open('Successfully deleted training label', 'Dismiss', {
          duration: 1600
        });
      }, error => {
        this.snackbar.open('Cannot delete as it is being referenced by other table', 'Dismiss', {
          duration: 2500
        });
      });
  }

  getTrainingLabels() {
    this.trainingLabelService.getLabelsPaginate(this.pageIndex, this.pageSize).subscribe(data => {
      this.dataLength = data['count'];
      this.dataSource = new MatTableDataSource<TrainingLabel>(data['rows']);
    });
  }

  changePage(pageEvent: PageEvent) {
    console.log(pageEvent);
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.getTrainingLabels();
  }

  get name() {
    return this.labelForm.get('name');
  }
}

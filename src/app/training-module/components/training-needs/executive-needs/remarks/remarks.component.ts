import { ExecutiveNeedService } from './../../../../services/executive-need.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExecutiveNeed } from '../../../../models/training-needs';

@Component({
  selector: 'app-remarks',
  templateUrl: './remarks.component.html',
  styleUrls: ['./remarks.component.scss']
})
export class RemarksComponent implements OnInit {
  remarksForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder,
    private executiveNeedService: ExecutiveNeedService,
    @Inject(MAT_DIALOG_DATA) public executiveNeed: ExecutiveNeed,
    public dialogRef: MatDialogRef<RemarksComponent>) { }

  ngOnInit() {
    this.remarksForm = this.fb.group({
      hod_remarks: [this.executiveNeed.hod_remarks, Validators.required]
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.executiveNeedService.updateNeedRemarks(this.executiveNeed.training_need_info_id, this.executiveNeed.id, this.remarksForm.value)
      .subscribe(() => {
        this.isLoading = false;
        this.dialogRef.close({ remarks: this.hod_remarks.value });
      }, error => {
        this.isLoading = false;
        console.log(error);
      });
  }

  get hod_remarks() {
    return this.remarksForm.get('hod_remarks');
  }
}

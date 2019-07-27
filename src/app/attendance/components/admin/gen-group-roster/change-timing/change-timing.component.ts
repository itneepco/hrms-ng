import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Group } from 'src/app/attendance/models/group';

import { GeneralRoster } from './../../../../models/general-roster';
import { Shift } from './../../../../models/shift';
import { GeneralRosterService } from './../../../../services/general-roster.service';

@Component({
  selector: "app-change-timing",
  templateUrl: "./change-timing.component.html",
  styleUrls: ["./change-timing.component.scss"]
})
export class ChangeTimingComponent implements OnInit {
  shifts: Shift[];
  isSubmitting = false;
  group: Group;
  roster: GeneralRoster;
  shift_id: FormControl = new FormControl("", Validators.required);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private genRosterService: GeneralRosterService,
    public dialogRef: MatDialogRef<ChangeTimingComponent>
  ) {}

  ngOnInit() {
    this.group = this.data.group;
    this.roster = this.data.roster;
    if(this.roster) this.shift_id.setValue(this.roster.shift_id);
    // Get all shifts
    this.shifts = this.data.shifts;
  }

  onSave() {
    this.isSubmitting = true;

    const data = {
      group_id: this.group.id,
      shift_id: this.shift_id.value
    } as GeneralRoster;

    console.log(data);

    if (this.roster && this.roster.id) {
      this.genRosterService.editGenRoster(this.roster.id, data).subscribe(
        result => {
          this.dialogRef.close(result);
          this.isSubmitting = false;
        },
        () => (this.isSubmitting = false)
      );
    }

    this.genRosterService.addGenRoster(data).subscribe(
      result => {
        this.dialogRef.close(result);
        this.isSubmitting = false;
      },
      () => (this.isSubmitting = false)
    );
  }
}

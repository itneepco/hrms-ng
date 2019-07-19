import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { switchMap } from 'rxjs/operators';
import { Group } from 'src/app/attendance/models/group';
import { ShiftService } from 'src/app/attendance/services/shift.service';
import { AuthService } from 'src/app/auth/services/auth.service';

import { Shift } from './../../../models/shift';
import { GroupService } from './../../../services/group.service';


@Component({
  selector: "app-group-roster",
  templateUrl: "./group-roster.component.html",
  styleUrls: ["./group-roster.component.scss"]
})
export class GroupRosterComponent implements OnInit {
  shifts: Shift[];
  groups: Group[];
  dates: Date[];
  startDate = new Date(2019, 5, 16);
  endDate = new Date(2019, 6, 15);
  rosterForm: FormGroup;

  constructor(
    private auth: AuthService,
    private shiftService: ShiftService,
    private groupService: GroupService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.dates = this.enumerateDaysBetweenDates(this.startDate, this.endDate);

    this.shiftService
      .getShifts(this.auth.currentUser.project)
      .pipe(
        switchMap(shifts => {
          this.shifts = shifts;
          return this.groupService.getShiftGroups(
            this.auth.currentUser.project
          );
        })
      )
      .subscribe(groups => {
        this.groups = groups;
        this.initForm();
        console.log(this.rosterForm);
      });
  }

  initForm() {
    let rosters = [];

    this.dates.forEach(date => {
      let group_shifts = [];
      this.groups.forEach(group => {
        group_shifts.push(
          this.fb.group({
            group_id: group.id,
            shift_id: ["", Validators.required]
          })
        );
      });

      let formControl = this.fb.group({
        date: date,
        group_shifts: this.fb.array(group_shifts)
      });

      rosters.push(formControl);
    });

    this.rosterForm = this.fb.group({
      rosters: this.fb.array(rosters)
    });
  }

  createGroupShift(): FormGroup {
    return this.fb.group({
      group_id: "",
      shift_id: ""
    });
  }

  enumerateDaysBetweenDates(startDate, endDate) {
    var dates = [];

    var currDate = moment(startDate).startOf("day");
    var lastDate = moment(endDate).startOf("day");

    dates.push(currDate.clone().toDate());

    while (currDate.add(1, "days").diff(lastDate) <= 0) {
      dates.push(currDate.clone().toDate());
    }

    return dates;
  }

  formatDate(date) {
    return moment(date).format("dddd, Do MMMM");
  }

  saveRoster() {
    console.log(this.rosterForm.value)
  }

  get rosters(): FormArray {
    return this.rosterForm.get("rosters") as FormArray;
  }

  getDate(index: number) {
    const dateValue = this.rosters.controls[index].get("date").value;
    return this.formatDate(dateValue);
  }

  getGroupShifts(index: number) {
    return this.rosters.controls[index].get("group_shifts") as FormArray;
  }

  getShift(roster_index: number, gs_index: number) {
    let group_shifts = this.rosters.controls[roster_index].get("group_shifts") as FormArray;
    return group_shifts.controls[gs_index].get('shift_id')
  }
}

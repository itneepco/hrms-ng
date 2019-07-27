import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { switchMap } from "rxjs/operators";
import { Group } from "src/app/attendance/models/group";
import { DateService } from "src/app/attendance/services/date.service";
import { ShiftService } from "src/app/attendance/services/shift.service";
import { AuthService } from "src/app/auth/services/auth.service";

import { Shift } from "./../../../models/shift";
import { GroupService } from "./../../../services/group.service";
import { GroupRosterService } from "src/app/attendance/services/group-roster.service";

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
    private fb: FormBuilder,
    private grpRosterService: GroupRosterService,
    private dateService: DateService
  ) {}

  ngOnInit() {
    this.dates = this.dateService.enumerateDaysBetweenDates(
      this.startDate,
      this.endDate
    );

    this.shiftService
      .getShifts()
      .pipe(
        switchMap(shifts => {
          this.shifts = shifts;
          return this.groupService.getShiftGroups();
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
            shift_id: [3, Validators.required]
          })
        );
      });

      let formControl = this.fb.group({
        day: date,
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

  formatDate(date) {
    return this.dateService.formatDate(date);
  }

  saveRoster() {
    console.log(this.rosterForm.invalid);
    // if (this.rosterForm.invalid) return;

    this.grpRosterService
      .addShiftRoster(
        this.auth.currentUser.project,
        this.rosterForm.get("rosters").value
      )
      .subscribe(data => {
        console.log(data);
      });
  }

  get rosters(): FormArray {
    return this.rosterForm.get("rosters") as FormArray;
  }

  getDay(index: number) {
    const dateValue = this.rosters.controls[index].get("day").value;
    return this.formatDate(dateValue);
  }

  getGroupShifts(index: number) {
    return this.rosters.controls[index].get("group_shifts") as FormArray;
  }

  getShift(roster_index: number, gs_index: number) {
    let group_shifts = this.rosters.controls[roster_index].get(
      "group_shifts"
    ) as FormArray;
    return group_shifts.controls[gs_index].get("shift_id");
  }
}

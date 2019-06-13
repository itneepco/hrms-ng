import { Location } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { ExecutiveNeedService } from "../../../services/executive-need.service";
import { AuthService } from "./../../../../auth/services/auth.service";
import {
  NEEDS_CREATED,
  NEEDS_RECOMMENDED,
  NEEDS_RETURNED,
  NEEDS_SUBMITTED
} from "./../../../models/training-global-codes";
import {
  ExecutiveNeed,
  TrainingNeedInfo
} from "./../../../models/training-needs";
import { NeedsInfoService } from "./../../../services/needs-info.service";
import { ExecutiveNeedsFormComponent } from "./executive-needs-form/executive-needs-form.component";
import { RemarksComponent } from "./remarks/remarks.component";

@Component({
  selector: "app-executive-needs",
  templateUrl: "./executive-needs.component.html",
  styleUrls: ["./executive-needs.component.scss"]
})
export class ExecutiveNeedsComponent implements OnInit, OnDestroy {
  needInfo: TrainingNeedInfo;
  displayedColumns = [
    "position",
    "training_label",
    "topic",
    "need_type",
    "duration"
  ];
  dataSource: MatTableDataSource<ExecutiveNeed>;
  errMsg: string;
  isLoading = false;
  needs_created = NEEDS_CREATED;
  needs_submitted = NEEDS_SUBMITTED;
  needs_returned = NEEDS_RETURNED;
  needs_recommended = NEEDS_RECOMMENDED;
  editSubs: Subscription;
  remarkSubs: Subscription;

  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private location: Location,
    public auth: AuthService,
    public needsInfoService: NeedsInfoService,
    public executiveNeedService: ExecutiveNeedService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      this.needInfo = routeData.needInfo;
      // console.log(this.needInfo);
      this.getExecutiveNeeds();
      if (this.needInfo.status === NEEDS_CREATED) {
        this.displayedColumns.push("actions");
      } else if (this.needInfo.status === NEEDS_RETURNED) {
        this.displayedColumns.push("hod_remarks");
        this.displayedColumns.push("actions");
      } else {
        this.displayedColumns.push("hod_remarks");
        if (this.auth.currentUser.emp_code === this.needInfo.addressee) {
          this.displayedColumns.push("actions");
        }
      }
    });
  }

  addTrainingNeed() {
    const dialogRef = this.dialog.open(ExecutiveNeedsFormComponent, {
      width: "550px",
      height: "430px",
      data: { needInfo: this.needInfo }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      console.log(result);
      const temp = this.dataSource.data;
      temp.unshift(result);
      this.dataSource.data = temp;
    });
  }

  onEdit(executiveNeed: ExecutiveNeed) {
    const dialogRef = this.dialog.open(ExecutiveNeedsFormComponent, {
      width: "550px",
      height: "430px",
      data: { needInfo: this.needInfo, need: executiveNeed }
    });

    this.editSubs = dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      const index = this.dataSource.data.indexOf(executiveNeed);
      const temp = this.dataSource.data;
      temp[index] = result;
      this.dataSource.data = temp;
    });
  }

  onDelete(executiveNeed: ExecutiveNeed) {
    const retVal = confirm("Are you sure you want to delete?");
    if (retVal !== true) {
      return;
    }

    this.executiveNeedService
      .deleteExecutiveNeed(this.needInfo.id, executiveNeed.id)
      .subscribe(
        () => {
          const temp = this.dataSource.data;
          const index = temp.indexOf(executiveNeed);
          temp.splice(index, 1);
          this.dataSource.data = temp;
          this.snackbar.open(
            "Successfully deleted the executiveNeed record",
            "Dismiss",
            {
              duration: 1600
            }
          );
        },
        error => {
          console.log(error);
          this.snackbar.open(
            "There was a problem deleting the record. Please try again",
            "Dismiss",
            {
              duration: 2500
            }
          );
        }
      );
  }

  addRemark(need: ExecutiveNeed) {
    console.log(need);
    const dialogRef = this.dialog.open(RemarksComponent, {
      width: "450px",
      height: "200px",
      data: need
    });

    this.remarkSubs = dialogRef.afterClosed().subscribe(data => {
      if (!data) {
        return;
      }

      need.hod_remarks = data.remarks;
    });
  }

  getExecutiveNeeds() {
    this.isLoading = true;
    this.executiveNeedService.getTrainigNeeds(this.needInfo.id).subscribe(
      result => {
        this.dataSource = new MatTableDataSource<ExecutiveNeed>(result);
        this.isLoading = false;
        // console.log(result);
      },
      errMsg => {
        this.errMsg = errMsg;
        this.isLoading = false;
      }
    );
  }

  goBack() {
    this.location.back();
  }

  getFullName(employee) {
    return `${employee.first_name} ${employee.middle_name} ${employee.last_name}`;
  }

  ngOnDestroy() {
    if (this.editSubs) {
      this.editSubs.unsubscribe();
    }
    if (this.remarkSubs) {
      this.remarkSubs.unsubscribe();
    }
  }
}

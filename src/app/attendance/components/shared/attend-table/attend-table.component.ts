import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { AttendRegApplication } from "src/app/attendance/models/attendance-regularize";
import { PunchRegularizeService } from "src/app/attendance/services/punch-regularize.service";
import { WorkflowDetailComponent } from "../workflow-detail/workflow-detail.component";

@Component({
  selector: "app-attend-table",
  templateUrl: "./attend-table.component.html",
  styleUrls: ["./attend-table.component.scss"]
})
export class AttendTableComponent implements OnInit {
  displayedColumns = [
    "position",
    "day",
    "name",
    "designation",
    "status",
    "reason",
    "actions"
  ];

  @Input("dataSource") dataSource: MatTableDataSource<AttendRegApplication>;
  @Input("pageNo") pageNo;

  @Output() onAction = new EventEmitter();
  @Output() pageChange = new EventEmitter();

  // Pagination variables
  @Input("dataLength") dataLength;
  @Input("pageSize") pageSize;
  @Input("pageIndex") pageIndex;
  @Input("actions") actions = [];

  constructor(
    private punchRegService: PunchRegularizeService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {}

  onShow(attendReg: AttendRegApplication, i: number) {
    const dialogRef = this.dialog.open(WorkflowDetailComponent, {
      panelClass: "detail-dialog",
      width: "680px",
      height: "580px",
      data: {
        attendReg: attendReg,
        actions: this.actions
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.onAction.emit(attendReg);
    });
  }

  getStatus(status) {
    return this.punchRegService.getStatus(status);
  }
}

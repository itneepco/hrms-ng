import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AttendRegApplication } from "src/app/attendance/models/attendance-regularize";
import { PunchRegularizeService } from "src/app/attendance/services/punch-regularize.service";
import { ATTEND_REG_TIME_ACTIONS } from 'src/app/attendance/models/attendance-codes';

@Component({
  selector: "app-approve-workflow",
  templateUrl: "./approve-workflow.component.html",
  styleUrls: ["./approve-workflow.component.scss"]
})
export class ApproveWorkflowComponent implements OnInit {
  approvalRequests = new MatTableDataSource<AttendRegApplication>();
  processedRequests = new MatTableDataSource<AttendRegApplication>();

  // Actions for time officer for pending requests
  pendingActions = ATTEND_REG_TIME_ACTIONS;

  // Pagination variables
  pendingDataLength = 10;
  pendingPageSize = 10;
  pendingPageIndex = 0;

  processedDataLength = 10;
  processedPageSize = 10;
  processedPageIndex = 0;

  constructor(private punchRegService: PunchRegularizeService) {}

  ngOnInit() {
    this.getApprovalRequests();
    this.getApprovedRejected();
  }

  getApprovalRequests() {
    this.punchRegService
      .fetchApprovalRequest(this.pendingPageIndex, this.pendingPageSize)
      .subscribe(pending => {
        this.approvalRequests.data = pending
      });
  }

  getApprovedRejected() {
    this.punchRegService
      .fetchApprovedRejected(this.processedPageIndex, this.processedPageSize)
      .subscribe(processed => {
        this.processedRequests.data = processed
      });
  }

  pendingChangePage(pageEvent: PageEvent) {
    this.pendingDataLength = pageEvent.pageIndex;
    this.pendingPageSize = pageEvent.pageSize;
    this.getApprovalRequests();
  }

  processedChangePage(pageEvent: PageEvent) {
    this.processedDataLength = pageEvent.pageIndex;
    this.processedPageSize = pageEvent.pageSize;
    this.getApprovedRejected();
  }

  pendingRefreshPage(attendReg: AttendRegApplication) {
    const index = this.approvalRequests.data.indexOf(attendReg);
    const temp = this.approvalRequests.data;
    temp.splice(index, 1);
    this.approvalRequests.data = temp;
    this.getApprovedRejected();
  }
}

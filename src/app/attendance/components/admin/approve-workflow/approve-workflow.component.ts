import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ATTEND_REG_TIME_ACTIONS } from "src/app/attendance/models/attendance-codes";
import { AttendRegApplication } from "src/app/attendance/models/attendance-regularize";
import { AttendPendingReqService } from "src/app/attendance/services/attend-pending-req.service";
import { PunchRegularizeService } from "src/app/attendance/services/punch-regularize.service";

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

  constructor(
    private pendingRequest: AttendPendingReqService,
    private punchRegService: PunchRegularizeService
  ) {}

  ngOnInit() {
    this.getApprovalRequests();
    this.getApprovedRejected();
  }

  getApprovalRequests() {
    this.punchRegService
      .fetchApprovalRequest(this.pendingPageIndex, this.pendingPageSize)
      .subscribe(result => {
        this.approvalRequests.data = result.rows;
        this.pendingDataLength = result.count;
      });
  }

  getApprovedRejected() {
    this.punchRegService
      .fetchApprovedRejected(this.processedPageIndex, this.processedPageSize)
      .subscribe(result => {
        this.processedRequests.data = result.rows;
        this.processedDataLength = result.count;
      });
  }

  pendingChangePage(pageEvent: PageEvent) {
    this.pendingPageIndex = pageEvent.pageIndex;
    this.pendingPageSize = pageEvent.pageSize;
    this.getApprovalRequests();
  }

  processedChangePage(pageEvent: PageEvent) {
    this.processedPageIndex = pageEvent.pageIndex;
    this.processedPageSize = pageEvent.pageSize;
    this.getApprovedRejected();
  }

  updateApprovalPage(attendReg: AttendRegApplication) {
    const index = this.approvalRequests.data.indexOf(attendReg);
    const temp = this.approvalRequests.data;
    temp.splice(index, 1);
    this.approvalRequests.data = temp;

    // Get approved reject list
    this.getApprovedRejected();
    // Update approval pending count
    this.pendingRequest.updateApprovalCount();
  }
}

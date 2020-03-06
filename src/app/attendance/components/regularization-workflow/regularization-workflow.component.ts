import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AuthService } from "src/app/auth/services/auth.service";
import {
  ATTEND_REG_CO_ACTIONS,
  ATTEND_REG_CO_CALLBACK
} from "../../models/attendance-codes";
import { AttendRegApplication } from "../../models/attendance-regularize";
import { PunchRegularizeService } from "../../services/punch-regularize.service";
import { AttendPendingReqService } from "../../services/attend-pending-req.service";

@Component({
  selector: "app-regularization-workflow",
  templateUrl: "./regularization-workflow.component.html",
  styleUrls: ["./regularization-workflow.component.scss"]
})
export class RegularizationWorkflowComponent implements OnInit {
  pendingRequests = new MatTableDataSource<AttendRegApplication>();
  processedRequests = new MatTableDataSource<AttendRegApplication>();

  // Pending request actions for controlling officer
  pendingActions = ATTEND_REG_CO_ACTIONS;

  // Processes request actions for controlling officer
  processedActions = ATTEND_REG_CO_CALLBACK;

  // Pagination variables
  pendingDataLength = 10;
  pendingPageSize = 10;
  pendingPageIndex = 0;
  processedDataLength = 10;
  processedPageSize = 10;
  processedPageIndex = 0;

  constructor(
    private auth: AuthService,
    private pendingRequest: AttendPendingReqService,
    private punchRegService: PunchRegularizeService
  ) {}

  ngOnInit() {
    this.getPendingRequests();
    this.getProcessedRequests();
  }

  getPendingRequests() {
    this.punchRegService
      .fetchPendingRequest(
        this.auth.currentUser.emp_code,
        this.pendingPageIndex,
        this.pendingPageSize
      )
      .subscribe(result => {
        this.pendingRequests.data = result.rows;
        this.pendingDataLength = result.count;
      });
  }

  getProcessedRequests() {
    this.punchRegService
      .fetchProcessedRequest(
        this.auth.currentUser.emp_code,
        this.processedPageIndex,
        this.processedPageSize
      )
      .subscribe(result => {
        this.processedRequests.data = result.rows;
        this.processedDataLength = result.count;
      });
  }

  pendingChangePage(pageEvent: PageEvent) {
    this.pendingDataLength = pageEvent.pageIndex;
    this.pendingPageSize = pageEvent.pageSize;
    this.getPendingRequests();
  }

  processedChangePage(pageEvent: PageEvent) {
    this.pendingDataLength = pageEvent.pageIndex;
    this.pendingPageSize = pageEvent.pageSize;
    this.getProcessedRequests();
  }

  updatePendingPage(attendReg: AttendRegApplication) {
    const index = this.pendingRequests.data.indexOf(attendReg);
    const temp = this.pendingRequests.data;
    temp.splice(index, 1);
    this.pendingRequests.data = temp;

    this.getProcessedRequests();
    // Update pending request page
    this.pendingRequest.updatePendingCount();
  }

  updateProcessedPage() {
    this.getPendingRequests();
  }
}

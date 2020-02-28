import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AuthService } from "src/app/auth/services/auth.service";
import { AttendRegApplication } from "../../models/attendance-regularize";
import { PunchRegularizeService } from "../../services/punch-regularize.service";

@Component({
  selector: "app-regularization-workflow",
  templateUrl: "./regularization-workflow.component.html",
  styleUrls: ["./regularization-workflow.component.scss"]
})
export class RegularizationWorkflowComponent implements OnInit {
  pendingRequests: MatTableDataSource<AttendRegApplication>;
  processedRequests: MatTableDataSource<AttendRegApplication>;

  // Pagination variables
  pendingDataLength = 10;
  pendingPageSize = 10;
  pendingPageIndex = 0;
  processedDataLength = 10;
  processedPageSize = 10;
  processedPageIndex = 0;

  constructor(
    private auth: AuthService,
    private punchRegService: PunchRegularizeService
  ) {}

  ngOnInit() {
    this.getPendingRequests();
    this.getProcessedRequests();
  }

  getPendingRequests() {
    this.punchRegService
      .fetchPendingRequest(this.auth.currentUser.emp_code)
      .subscribe(pending => {
        this.pendingRequests = new MatTableDataSource(pending);
      });
  }

  getProcessedRequests() {
    this.punchRegService
      .fetchProcessedRequest(this.auth.currentUser.emp_code)
      .subscribe(processed => {
        this.processedRequests = new MatTableDataSource(processed);
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

  pendingRefreshPage() {
    this.getPendingRequests();
  }

  processedRefreshPage() {
    this.getProcessedRequests();
  }
}

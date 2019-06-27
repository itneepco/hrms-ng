import { Subscription } from "rxjs";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

import { TrainingInfo } from "../../models/training";
import { TrainingService } from "../../services/training.service";
import { MyFeedbackStatusService } from "../../services/my-feedback-status.service";

@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.css"]
})
export class FeedbackComponent implements OnInit, OnDestroy {
  pendingSource: MatTableDataSource<TrainingInfo>;
  submittedSource: MatTableDataSource<TrainingInfo>;
  errMsg: string;
  isLoading = true;
  isAdminPage = false;
  subscription: Subscription;

  // Pagination variables
  pendingLength = 0;
  submittedLength = 0;
  pageSize = 10;
  pageIndex = 0;

  constructor(
    public trainingService: TrainingService,
    private myFeedbackStatus: MyFeedbackStatusService
  ) {}

  ngOnInit() {
    this.fetchData();
    this.subscription = this.myFeedbackStatus.status$.subscribe(() =>
      this.fetchData()
    );
  }

  private fetchData() {
    this.getFeedbackPendings();
    this.getSubmittedFeedbacks();
  }

  private getFeedbackPendings() {
    this.isLoading = true;
    this.trainingService
      .feedbackPending(this.pageIndex, this.pageSize)
      .subscribe(
        data => {
          this.pendingLength = data.count;
          this.pendingSource = new MatTableDataSource<TrainingInfo>(data.rows);
          this.isLoading = false;
          console.log(data);
        },
        errMsg => {
          this.errMsg = errMsg;
          this.isLoading = false;
        }
      );
  }

  private getSubmittedFeedbacks() {
    this.isLoading = true;
    this.trainingService
      .feedbackSubmitted(this.pageIndex, this.pageSize)
      .subscribe(
        data => {
          this.submittedLength = data["count"];
          this.submittedSource = new MatTableDataSource<TrainingInfo>(
            data["rows"]
          );
          this.isLoading = false;
          console.log(data);
        },
        errMsg => {
          this.errMsg = errMsg;
          this.isLoading = false;
        }
      );
  }

  changePendingPage(pageEvent: PageEvent) {
    console.log(pageEvent);
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.getFeedbackPendings();
  }

  changeSubmittedPage(pageEvent: PageEvent) {
    console.log(pageEvent);
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.getSubmittedFeedbacks();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

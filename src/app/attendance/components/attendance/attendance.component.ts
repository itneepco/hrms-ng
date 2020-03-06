import { Component, OnInit, OnDestroy } from "@angular/core";
import { NavObject } from "src/app/shared/models/nav-object";
import { AttendPendingReqService } from "../../services/attend-pending-req.service";
import { PunchRegularizeService } from "../../services/punch-regularize.service";
import { AuthService } from "./../../../auth/services/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-attendance",
  templateUrl: "./attendance.component.html",
  styleUrls: ["./attendance.component.scss"]
})
export class AttendanceComponent implements OnInit, OnDestroy {
  approveReqCount: number;
  pendingReqCount: number;
  approvalSubs: Subscription;
  pendingSubs: Subscription;

  navObj: NavObject[] = [
    {
      name: "Dashboard",
      path: "dashboard"
    },
    {
      name: "Attendance",
      path: "/attendance/status"
    },
    {
      name: "Regularization Workflow",
      path: "/attendance/reg-workflow"
    }
  ];

  constructor(
    private auth: AuthService,
    private pendingRequest: AttendPendingReqService,
    private punchRegService: PunchRegularizeService
  ) {}

  ngOnInit() {
    if (this.auth.isTimeOfficeAdmin()) {
      this.navObj.push({
        name: "Approve / Reject",
        path: "/attendance/approve-workflow",
        count: this.approveReqCount
      });

      this.navObj.push({
        name: "Shift Roster",
        path: "/attendance/shift-grp-roster"
      });

      this.navObj.push({
        name: "General Roster",
        path: "/attendance/gen-grp-roster"
      });

      this.navObj.push({
        name: "Absentee Statement",
        path: "/attendance/absentee-statement"
      });

      // Get approval pending count - for Time Officer
      this.approvalSubs = this.pendingRequest.approvalReqState.subscribe(() =>
        this.getApprovalReqCount()
      );
      this.getApprovalReqCount();
    }

    // Get pending request counts - for Controlling Officer
    this.pendingSubs = this.pendingRequest.pendingReqState.subscribe(() =>
      this.getPendingReqCount()
    );

    this.getPendingReqCount();
  }

  getPendingReqCount() {
    this.punchRegService
      .getPendingReqCount(this.auth.currentUser.emp_code)
      .subscribe(count => {
        this.navObj[2].count = count ? count : 0;
      });
  }

  getApprovalReqCount() {
    this.punchRegService.getApprovalReqCount().subscribe(count => {
      this.navObj[3].count = count ? count : 0;
    });
  }

  ngOnDestroy() {
    if (this.approvalSubs) this.approvalSubs.unsubscribe();
    if (this.pendingSubs) this.pendingSubs.unsubscribe();
  }
}

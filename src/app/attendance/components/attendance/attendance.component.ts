import { Component, OnInit } from "@angular/core";
import { NavObject } from "src/app/shared/models/nav-object";
import { AuthService } from "./../../../auth/services/auth.service";

@Component({
  selector: "app-attendance",
  templateUrl: "./attendance.component.html",
  styleUrls: ["./attendance.component.scss"]
})
export class AttendanceComponent implements OnInit {
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

  constructor(private auth: AuthService) {}

  ngOnInit() {
    if (this.auth.isTimeOfficeAdmin()) {
      this.navObj.push({
        name: "Approval Workflow",
        path: "/attendance/approve-workflow"
      });

      this.navObj.push({
        name: "Shift Roster",
        path: "/attendance/shift-grp-roster"
      });

      this.navObj.push({
        name: "General Roster",
        path: "/attendance/gen-grp-roster"
      });

      // this.navObj.push({
      //   name: 'Process Attendance',
      //   path: '/attendance/process-data',
      // })

      this.navObj.push({
        name: "Absentee Statement",
        path: "/attendance/absentee-statement"
      });
    }
  }
}

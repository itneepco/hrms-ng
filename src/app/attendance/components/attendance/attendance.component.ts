import { AuthService } from "./../../../auth/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { NavObject } from "src/app/shared/models/nav-object";

@Component({
  selector: "app-attendance",
  templateUrl: "./attendance.component.html",
  styleUrls: ["./attendance.component.scss"]
})
export class AttendanceComponent implements OnInit {
  navObj: NavObject[] = [{ name: "Dashboard", path: "dashboard" }];

  constructor(private auth: AuthService) {}

  ngOnInit() {
    if (this.auth.isTimeOfficeAdmin() || this.auth.isItAdmin()) {
      this.navObj.push({
        name: "Shift Roster",
        path: "/attendance/shift-grp-roster"
      });

      this.navObj.push({
        name: "General Roster",
        path: "/attendance/gen-grp-roster"
      });
    }
  }
}

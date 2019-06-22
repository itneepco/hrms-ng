import { Component, OnInit } from "@angular/core";
import { NavObject } from "src/app/shared/models/nav-object";

@Component({
  selector: "app-attendance",
  templateUrl: "./attendance.component.html",
  styleUrls: ["./attendance.component.scss"]
})
export class AttendanceComponent implements OnInit {
  navObj: NavObject[] = [
    { name: "Dashboard", path: "dashboard" },
  ];

  constructor() {}

  ngOnInit() {}
}

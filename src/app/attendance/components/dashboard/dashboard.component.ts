import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ChartOptions, ChartType } from "chart.js";
import { Label } from "ng2-charts";
import { AuthService } from "src/app/auth/services/auth.service";
import { WageMonth } from "../../models/wage-month";
import { EmployeeDashboardService } from "../../services/employee-dashboard.service";
import { GraphDashboardService } from "../../services/graph-dashboard.service";
import { WageMonthService } from "../../services/wage-month.service";
import { WageMonthFormComponent } from "../admin/wage-month-form/wage-month-form.component";
import { DateService } from "./../../../shared/services/date.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  activeWageMonth: WageMonth;
  punchTimings = [];
  latePunchings = [];
  todaysPunchings = [];
  attendance;
  current_shift;
  curr_day: string;

  // Pie chart option
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: "left" // or top
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        }
      }
    }
  };

  public pieChartType: ChartType = "pie";
  public pieChartLegend = true;

  public inTimeLabels: Label[] = [];
  public outTimeLabels: Label[] = [];

  public inTimeData: number[] = [];
  public outTimeData: number[] = [];

  public inTimeColors = [
    {
      backgroundColor: [
        "rgba(51, 204, 51, 0.5)",
        "rgba(204, 102, 255, 0.5)",
        "rgba(255, 0, 0, 0.5)"
      ]
    }
  ];
  public outTimeColors = [
    {
      backgroundColor: [
        "rgba(255, 0, 0, 0.5)",
        "rgba(0, 102, 204, 0.5)",
        "rgba(255, 0, 255, 0.5)"
      ]
    }
  ];

  constructor(
    private dialog: MatDialog,
    public auth: AuthService,
    private dateService: DateService,
    private graphService: GraphDashboardService,
    private empDashboardService: EmployeeDashboardService,
    private wageMonthService: WageMonthService
  ) {}

  ngOnInit() {
    this.wageMonthService.getActiveWageMonth().subscribe(wageMonth => {
      this.activeWageMonth = wageMonth;
      if (!this.activeWageMonth) {
        this.openWageMonth();
      }
    });

    if (!this.auth.isTimeOfficeAdmin()) {
      this.empDashboardService.getShiftTimings().subscribe(data => {
        // console.log(data)
        this.punchTimings = data;
      });
      this.empDashboardService.getLatePunchings().subscribe(data => {
        // console.log(data)
        this.latePunchings = data;
      });
      this.empDashboardService.getTodaysPunching().subscribe(data => {
        // console.log(data)
        this.todaysPunchings = data;
      });
    } else {
      this.fetchAttendanceStatus();
    }
  }

  fetchAttendanceStatus(day?: string) {
    this.graphService.getAttendanceStats(day).subscribe(result => {
      const data = result.data;
      if (!data || data.length < 1) return;

      console.log(data)
      this.attendance = data;
      this.curr_day = data.day;

      this.current_shift = this.attendance.stats[0].shift;
      this.inTimeLabels = this.attendance.stats[0].in_time_labels;
      this.inTimeData = this.attendance.stats[0].in_time_data;
      this.outTimeLabels = this.attendance.stats[0].out_time_labels;
      this.outTimeData = this.attendance.stats[0].out_time_data;
    });
  }

  public onChange(index: number) {
    this.current_shift = this.attendance.stats[index].shift;
    this.inTimeLabels = this.attendance.stats[index].in_time_labels;
    this.inTimeData = this.attendance.stats[index].in_time_data;
    this.outTimeLabels = this.attendance.stats[index].out_time_labels;
    this.outTimeData = this.attendance.stats[index].out_time_data;
  }

  // events
  public chartClicked({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  openWageMonth() {
    this.dialog.open(WageMonthFormComponent, {
      width: "520px",
      height: "380px"
    });
  }

  prevDay() {
    const prevDay = this.dateService.decreaseByOneDay(this.curr_day, 1);
    console.log(prevDay)
    this.fetchAttendanceStatus(this.dateService.getDateYYYYMMDD(prevDay));
  }

  nextDay() {
    const nextDay = this.dateService.increaseByOneDay(this.curr_day, 1);
    console.log(nextDay)
    this.fetchAttendanceStatus(this.dateService.getDateYYYYMMDD(nextDay));
  }
}

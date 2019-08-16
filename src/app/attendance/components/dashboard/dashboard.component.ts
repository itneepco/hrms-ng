import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { WageMonth } from '../../models/wage-month';
import { WageMonthService } from '../../services/wage-month.service';
import { WageMonthFormComponent } from '../admin/wage-month-form/wage-month-form.component';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  activeWageMonth: WageMonth;
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left', // or top
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };

  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;

  public inTimeLabels: Label[] = [
    'In time - 9:00 am to 10:00 am',
    'In time - 10:00 am to 10:15 am',
    'In time - After 10:15 am',
  ];
  public outTimeLabels: Label[] = [
    'Out time - Before 5:00 pm',
    'Out time - 5:00 pm to 6 pm',
    'Out time - After 6 pm',
  ]

  public inTimeData: number[] = [300, 150, 50];
  public outTimeData: number[] = [20, 400, 70];

  public inTimeColors = [
    {
      backgroundColor: [
        'rgba(255,0,0,0.4)',
        'rgba(0,255,0,0.4)',
        'rgba(0,0,255,0.4)',
      ],
    },
  ];
  public outTimeColors = [
    {
      backgroundColor: [
        'rgba(255,0,255,0.4)',
        'rgba(205,180,100,0.4)',
        'rgba(0,255,255,0.4)',
      ],
    },
  ];

  constructor(private dialog: MatDialog,
    public auth: AuthService,
    private wageMonthService: WageMonthService) { }

  ngOnInit() {
    this.wageMonthService.getActiveWageMonth().subscribe(wageMonth => {
      this.activeWageMonth = wageMonth
      if (!this.activeWageMonth) {
        this.openWageMonth()
      }
    })
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  openWageMonth() {
    this.dialog.open(WageMonthFormComponent, {
      width: '520px',
      height: '380px'
    });
  }

  downloadAbsentee() {

  }
}

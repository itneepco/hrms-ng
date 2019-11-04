import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { TrainingNeedInfo } from '../../models/training-needs';
import { NeedsInfoService } from '../../services/needs-info.service';
import { AuthService } from './../../../auth/services/auth.service';

@Component({
  selector: 'app-pending-request',
  templateUrl: './pending-request.component.html',
  styleUrls: ['./pending-request.component.scss']
})
export class PendingRequestComponent implements OnInit {

  displayedColumns = ['position', 'year', 'cadre', 'status', 'actions'];
  dataSource: MatTableDataSource<TrainingNeedInfo>;

  constructor(private router: Router,
    private needsInfoService: NeedsInfoService,
    private auth: AuthService) { }

  ngOnInit() {
    this.needsInfoService.getPendingNeeds(this.auth.currentUser.emp_code)
      .subscribe(data => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
      });
  }

  onView(needInfo: TrainingNeedInfo) {
    if (needInfo.cadre === 'E') {
      this.router.navigate(['/training/executive-needs', needInfo.id]);
    } else {
      this.router.navigate(['/training/non-exec-needs', needInfo.id]);
    }
  }

  getGrade(grade: string) {
    return this.needsInfoService.getGrade(grade);
  }

  getNeedsStatus(status: string) {
    return this.needsInfoService.getNeedsInfoStatus(status);
  }

  getFullName(employee) {
    return `${employee.first_name} ${employee.middle_name} ${employee.last_name}`;
  }
}

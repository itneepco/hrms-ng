import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { NeedsInfoService } from '../../services/needs-info.service';
import { AuthService } from './../../../auth/services/auth.service';
import { TrainingNeedInfo } from './../../models/training-needs';

@Component({
  selector: 'app-training-needs',
  templateUrl: './training-needs.component.html',
  styleUrls: ['./training-needs.component.scss']
})
export class TrainingNeedsComponent implements OnInit {
  displayedColumns = ['position', 'year', 'cadre', 'status', 'actions'];
  dataSource: MatTableDataSource<TrainingNeedInfo>;

  constructor(private router: Router,
    private needsInfoService: NeedsInfoService,
    private auth: AuthService) { }

  ngOnInit() {
    this.needsInfoService.getTrainigNeeds(this.auth.currentUser.emp_code)
      .subscribe(data => {
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
}

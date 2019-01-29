import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { CL_CODE, HD_CL_CODE, RH_CODE } from '../../../shared/models/global-codes';
import { LeaveStatus } from '../../../shared/models/leave';
import { LeaveTypeService } from '../../../shared/services/leave-type.service';

@Component({
  selector: 'app-leave-menu',
  templateUrl: './leave-menu.component.html',
  styleUrls: ['./leave-menu.component.scss']
})
export class LeaveMenuComponent {
  hd_cl_code = HD_CL_CODE
  
  constructor(private bottomSheetRef: MatBottomSheetRef<LeaveMenuComponent>,
    public leaveTypeService: LeaveTypeService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}

  onSelect(event: MouseEvent, status: LeaveStatus, isHDCL?: boolean): void {
    let newStatus = status
    
    //If it is Half Day Casual Leave
    if(isHDCL) {
      newStatus = {
        leave_code: HD_CL_CODE,
        leave_type: "HDCL",
        balance: status.balance
      }  
    }

    this.bottomSheetRef.dismiss({
      date: this.data.date,
      status: newStatus
    });

    event.preventDefault();
  }

  get cl_status(): LeaveStatus {
    return this.data.leaveStatuses.find(status => status.leave_code === CL_CODE)
  }

  get rh_status(): LeaveStatus {
    return this.data.leaveStatuses.find(status => status.leave_code === RH_CODE)
  }
}

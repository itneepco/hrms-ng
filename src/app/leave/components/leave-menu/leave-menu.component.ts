import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { LeaveStatus } from './../../models/leave';
import { LeaveTypeService } from '../../services/leave-type.service';
import { RH_CODE } from '../../models/global-codes';

@Component({
  selector: 'app-leave-menu',
  templateUrl: './leave-menu.component.html',
  styleUrls: ['./leave-menu.component.scss']
})
export class LeaveMenuComponent {
  rh_code = RH_CODE
  
  constructor(private bottomSheetRef: MatBottomSheetRef<LeaveMenuComponent>,
    public leaveTypeService: LeaveTypeService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

  onSelect(event: MouseEvent, status: LeaveStatus): void {
    this.bottomSheetRef.dismiss({
      date: this.data.date,
      status: status
    });
    event.preventDefault();
  }

}

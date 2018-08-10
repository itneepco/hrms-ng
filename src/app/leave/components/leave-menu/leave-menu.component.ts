import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-leave-menu',
  templateUrl: './leave-menu.component.html',
  styleUrls: ['./leave-menu.component.scss']
})
export class LeaveMenuComponent {

  constructor(private bottomSheetRef: MatBottomSheetRef<LeaveMenuComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}

  onSelect(event: MouseEvent, type: string): void {
    this.bottomSheetRef.dismiss({
      date: this.data.date,
      type: type
    });
    event.preventDefault();
  }


}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HierarchyService } from '../../admin/services/hierarchy.service';
import { EL_HPL_ADMIN, HR_LEAVE_SUPER_ADMIN } from '../../shared/models/global-codes';
import { LeaveDetail } from '../../shared/models/leave';
import { CtrlOfficer } from '../models/adressee';
import { Addressee } from './../models/adressee';
import { LeaveTypeService } from './leave-type.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveCtrlOfficerService {

  constructor(private leaveType: LeaveTypeService,
    private hierarchyService: HierarchyService) { }

  getLeaveCtrlOfficers(emp_code: string, leaveDetails: LeaveDetail[]): Observable<Addressee[]> {
    return this.hierarchyService.getParents(emp_code)
      .pipe(map((ctrlOfficers: CtrlOfficer[]) => {
        return this.setCtrlOfficers(ctrlOfficers, leaveDetails)
      }))
  }

  private setCtrlOfficers(ctrlOfficers: CtrlOfficer[], leaveDetails: LeaveDetail[]): Addressee[] {
    let officers = []
    ctrlOfficers.forEach(officer => {
      officers.push({
        name: this.getOfficerName(officer),
        code: officer.emp_code
      })
    })

    if(this.leaveType.isEarnedLeave(leaveDetails) || this.leaveType.isHalfPayLeave(leaveDetails)) {
      let el_hpl_site_admin = { name: "Project Leave Sanction Officer", code: EL_HPL_ADMIN }
      let el_hpl_corporate_admin = { name: "Corporate Leave Sanction Officer", code: HR_LEAVE_SUPER_ADMIN }
  
      officers.push(el_hpl_site_admin)
      officers.push(el_hpl_corporate_admin)
    }

    return officers
  }

  private getOfficerName(officer) {
    return `${officer.first_name} ${officer.last_name}, ${officer.designation}`
  }
}

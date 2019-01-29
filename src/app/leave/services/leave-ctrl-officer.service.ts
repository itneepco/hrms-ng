import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HierarchyService } from '../../admin/services/hierarchy.service';
import { EL_HPL_ADMIN, HR_LEAVE_SUPER_ADMIN } from '../../shared/models/global-codes';
import { LeaveDetail } from '../../shared/models/leave';
import { CtrlOfficer } from '../models/adressee';
import { Addressee } from './../models/adressee';
import { LeaveTypeService } from '../../shared/services/leave-type.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveCtrlOfficerService {

  constructor(private leaveType: LeaveTypeService,
    private hierarchyService: HierarchyService) { }

  getLeaveCtrlOfficers(emp_code: string, leaveDetails: LeaveDetail[], rolemapper = false): Observable<Addressee[]> {
    return this.hierarchyService.getParents(emp_code)
      .pipe(map((ctrlOfficers: CtrlOfficer[]) => {
        let officers = ctrlOfficers
        // console.log(rolemapper)
        return this.setCtrlOfficers(officers, leaveDetails, rolemapper)
      }))
  }

  private setCtrlOfficers(ctrlOfficers: CtrlOfficer[], leaveDetails: LeaveDetail[], rolemapper: boolean): Addressee[] {
    let officers = []
    ctrlOfficers.forEach(officer => {
      officers.push({
        name: this.getOfficerName(officer),
        code: officer.emp_code
      })
    })

    //if leave rolemapper is not required, the return without adding leave rolemapper
    if(!rolemapper) return officers

    if(this.leaveType.isEarnedLeave(leaveDetails) || this.leaveType.isHalfPayLeave(leaveDetails)) {
      let el_hpl_site_admin = { name: "Office, Project, Branch Leave Sanction Officer (Level 1)", code: EL_HPL_ADMIN }
      let el_hpl_corporate_admin = { name: "Corporate Leave Sanction Officer (Level 2)", code: HR_LEAVE_SUPER_ADMIN }
  
      officers.push(el_hpl_site_admin)
      officers.push(el_hpl_corporate_admin)
    }

    return officers
  }

  private getOfficerName(officer) {
    return `${officer.first_name} ${officer.last_name}, ${officer.designation}`
  }
}

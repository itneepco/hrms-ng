import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseURL } from 'src/app/shared/config/baseUrl';

import { CL_CODE, EL_CODE, HD_CL_CODE, HPL_CODE, RH_CODE } from '../models/global-codes';
import { LeaveApplication, LeaveDetail } from '../models/leave';
import { LeaveType } from './../../attendance/models/absent-dtl';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: "root"
})
export class LeaveTypeService {
  constructor(private http: HttpClient, private handler: ErrorHandlerService) {}

  getUrl() {
    return baseURL + `api/leave-types`;
  }

  getAllLeaveTypes(): Observable<LeaveType[]> {
    return this.http
      .get<LeaveType[]>(this.getUrl())
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  addAddLeaveType(leaveType: LeaveType) {
    return this.http
      .post(this.getUrl(), leaveType)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  editLeaveType(id: number, leaveType: LeaveType) {
    return this.http
      .put(`${this.getUrl()}/${id}`, leaveType)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  deleteLeaveType(id: number) {
    return this.http
      .delete(`${this.getUrl()}/${id}`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  getLeaveType(code: string) {
    switch (code) {
      case CL_CODE: {
        return "Casual Leave";
      }
      case RH_CODE: {
        return "Restricted Holiday";
      }
      case EL_CODE: {
        return "Earned Leave";
      }
      case HPL_CODE: {
        return "Half Pay Leave";
      }
      case HD_CL_CODE: {
        return "Half Day CL";
      }
    }
  }

  getLeaveTypeShort(leaveApplication: LeaveApplication) {
    let el_type = leaveApplication.leaveDetails.find(
      leaveDetail => leaveDetail.leave_type == EL_CODE
    );
    if (el_type) return "EL";

    let hpl_type = leaveApplication.leaveDetails.find(
      leaveDetail => leaveDetail.leave_type == HPL_CODE
    );
    if (hpl_type) return "ML/HPL";

    let cl_rh_type = leaveApplication.leaveDetails.find(
      leaveDetail =>
        leaveDetail.leave_type == CL_CODE || leaveDetail.leave_type == RH_CODE
    );
    if (cl_rh_type) return "CL/RH";
  }

  getSpecificLeaveType(leaveDetail: LeaveDetail) {
    if (leaveDetail.leave_type == CL_CODE) {
      return "CL";
    }
    if (leaveDetail.leave_type == RH_CODE) {
      return "RH";
    }
    if (leaveDetail.leave_type == HD_CL_CODE) {
      return "HD CL";
    }
  }

  isEarnedLeave(leaves: LeaveDetail[]): boolean {
    let el_type = leaves.find(leaveDetail => leaveDetail.leave_type == EL_CODE);
    return el_type ? true : false;
  }

  isHalfPayLeave(leaves: LeaveDetail[]): boolean {
    let ml_type = leaves.find(
      leaveDetail => leaveDetail.leave_type == HPL_CODE
    );
    return ml_type ? true : false;
  }

  isCasualLeave(leaves: LeaveDetail[]): boolean {
    let el_type = leaves.find(leaveDetail => leaveDetail.leave_type == CL_CODE);
    return el_type ? true : false;
  }

  isRestrictedHoliday(leaves: LeaveDetail[]): boolean {
    let el_type = leaves.find(leaveDetail => leaveDetail.leave_type == RH_CODE);
    return el_type ? true : false;
  }

  isHalfDayCl(leaves: LeaveDetail[]): boolean {
    let el_type = leaves.find(
      leaveDetail => leaveDetail.leave_type == HD_CL_CODE
    );
    return el_type ? true : false;
  }

  noOfCasualLeave(leaves: LeaveDetail[]) {
    return leaves.filter(leaveDetail => leaveDetail.leave_type == CL_CODE)
      .length;
  }

  noOfHalfDayCL(leaves: LeaveDetail[]) {
    return (
      leaves.filter(leaveDetail => leaveDetail.leave_type == HD_CL_CODE)
        .length / 2
    );
  }

  noOfRestrictedHoliday(leaves: LeaveDetail[]) {
    return leaves.filter(leaveDetail => leaveDetail.leave_type == RH_CODE)
      .length;
  }

  noOfEarnedLeave(leaves: LeaveDetail[]) {
    let leave = leaves[0];
    let to_date = new Date(leave.to_date);
    let from_date = new Date(leave.from_date);
    let no_of_el =
      (to_date.valueOf() - from_date.valueOf()) / (60 * 60 * 24 * 1000) + 1;

    if (leave.leave_type == EL_CODE) {
      return no_of_el;
    }

    return 0;
  }

  noOfHalfPayLeave(leaves: LeaveDetail[]) {
    let leave = leaves[0];
    let to_date = new Date(leave.to_date);
    let from_date = new Date(leave.from_date);
    let no_of_hpl =
      (to_date.valueOf() - from_date.valueOf()) / (60 * 60 * 24 * 1000) + 1;

    if (leave.leave_type == HPL_CODE) {
      return no_of_hpl;
    }

    return 0;
  }
}

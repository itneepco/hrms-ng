import { Injectable } from "@angular/core";
import { EL_HPL_ADMIN, HR_LEAVE_SUPER_ADMIN } from "src/app/shared/models/global-codes";
import { LeaveApplication } from "src/app/shared/models/leave";
import { DateService } from "src/app/shared/services/date.service";
import { LeaveTypeService } from "src/app/shared/services/leave-type.service";
import { WageMonth } from "./../../attendance/models/wage-month";
import { AuthService } from "./../../auth/services/auth.service";
import { APPROVE_ACTION_TYPES, CALLBACK_ACTION_TYPES, EL_HPL_ACTION_TYPES, JR_ACCEPTED, LEAVE_APPLIED, LEAVE_APPROVED, LEAVE_CALLBACKED, LEAVE_CANCEL_ACTION_TYPES, LEAVE_CANCEL_CALLBACKED, LEAVE_CANCEL_CALLBACK_ACTION_TYPES, LEAVE_CANCEL_EL_HPL_ACTION_TYPES, LEAVE_CANCEL_INITIATION, LEAVE_CANCEL_INITIATION_ACTION_TYPES, LEAVE_CANCEL_NOT_RECOMMENDED, LEAVE_CANCEL_PROCESS_ACTION_TYPES, LEAVE_CANCEL_RECOMMENDED, LEAVE_NOT_RECOMMENDED, LEAVE_PROCESSED_PAGE, LEAVE_RECOMMENDED, LEAVE_REQUEST_PAGE, PROCESS_ACTION_TYPES, TRANSACTION_PAGE } from "./../models/leave.codes";

@Injectable({
  providedIn: "root"
})
export class UserActionService {
  constructor(
    private auth: AuthService,
    private dateService: DateService,
    private leaveType: LeaveTypeService
  ) { }

  // Find the leave workflow action types
  getActions(
    leaveApp: LeaveApplication,
    pageNo: string,
    currWageMonth: WageMonth
  ): any {
    const status = leaveApp.status;
    const addressedTo = leaveApp.addressee;

    /***********************************************************************
     ************** check if leave request page ******************
     **********************************************************************/
    if (pageNo === LEAVE_REQUEST_PAGE) {
      if (
        status === LEAVE_CANCEL_INITIATION ||
        status === LEAVE_CANCEL_RECOMMENDED ||
        status === LEAVE_CANCEL_CALLBACKED
      ) {
        if (
          this.leaveType.isEarnedLeave(leaveApp.leaveDetails) ||
          this.leaveType.isHalfPayLeave(leaveApp.leaveDetails)
        ) {
          // check if cancellation of EL or HPL application has been already recommended and forwarded to EL HPL Admin
          if (
            status === LEAVE_CANCEL_RECOMMENDED &&
            (addressedTo === EL_HPL_ADMIN ||
              addressedTo === HR_LEAVE_SUPER_ADMIN) &&
            (this.auth.isElHplAdmin() || this.auth.isHrLeaveSuperAdmin())
          ) {
            return LEAVE_CANCEL_ACTION_TYPES;
          }
          // if if cancellation of EL or HPL application has not been forwarded to EL HPL Admin yet
          return LEAVE_CANCEL_EL_HPL_ACTION_TYPES;
        }
        // For other types of leaves other than EL or HPL
        return LEAVE_CANCEL_PROCESS_ACTION_TYPES;
      }

      if (
        status === LEAVE_APPLIED ||
        status === LEAVE_RECOMMENDED ||
        status === LEAVE_CALLBACKED
      ) {
        // check if the leave is earned leave or half pay leave
        if (
          this.leaveType.isEarnedLeave(leaveApp.leaveDetails) ||
          this.leaveType.isHalfPayLeave(leaveApp.leaveDetails)
        ) {
          // check if EL or ML has been already recommended and forwarded to EL HPL Admin
          if (
            status === LEAVE_RECOMMENDED &&
            (addressedTo === EL_HPL_ADMIN ||
              addressedTo === HR_LEAVE_SUPER_ADMIN) &&
            (this.auth.isElHplAdmin() || this.auth.isHrLeaveSuperAdmin())
          ) {
            return APPROVE_ACTION_TYPES;
          }
          // if EL or ML has not been forwarded to EL HPL Admin yet
          return EL_HPL_ACTION_TYPES;
        }
        // if leave is not EL or HPL
        return PROCESS_ACTION_TYPES;
      }
      // else actions will be empty
      return [];
    }

    /***********************************************************************
     ************** check if leave transaction page ******************
     **********************************************************************/
    if (pageNo === TRANSACTION_PAGE) {
      // If current wage month is defined
      if (currWageMonth) {
        const leaveDtls = leaveApp.leaveDetails;
        // Iterate over each leaves
        for (let i = 0; i < leaveDtls.length; i++) {
          let from_date = this.dateService.datesDiff(
            leaveDtls[i].from_date,
            currWageMonth.from_date
          );
          // if leave taken is before active wage month start, employee cannot cancel it
          // i.e after month end leave cancellation is not allowed
          if (from_date < 0) {
            return [];
          }
        }
      }

      const joiningReport = leaveApp.joiningReport;
      // if leave is applied, recommended, the leave application can be callbacked by applied user
      if (status == LEAVE_APPLIED || status == LEAVE_RECOMMENDED) {
        return CALLBACK_ACTION_TYPES;
      }
      // If leave is approved then the employee can initiate leave cancellation and joining report is not accepted
      if (status == LEAVE_APPROVED) {
        if (joiningReport && joiningReport.status == JR_ACCEPTED) {
          return [];
        }

        return LEAVE_CANCEL_INITIATION_ACTION_TYPES;
      }
      // If leave is cancellation is initialized then the employee can callback
      if (status === LEAVE_CANCEL_INITIATION) {
        return LEAVE_CANCEL_CALLBACK_ACTION_TYPES;
      }
      if (status === LEAVE_CANCEL_CALLBACKED) {
        if (leaveApp.addressee.length < 1) {
          return LEAVE_CANCEL_INITIATION_ACTION_TYPES;
        }
        return LEAVE_CANCEL_CALLBACK_ACTION_TYPES;
      }
      // else actions will be empty
      return [];
    }

    /***********************************************************************
     ************** Check is leave processed page ******************
     **********************************************************************/
    if (pageNo === LEAVE_PROCESSED_PAGE) {
      // if leave is recommended or not recommended, the leave application can be callbacked by controlling user
      if (status === LEAVE_RECOMMENDED || status === LEAVE_NOT_RECOMMENDED) {
        return CALLBACK_ACTION_TYPES;
      }
      // if leave cancellation is recommended or not recommended, the leave application can be callbacked by controlling user
      if (
        status === LEAVE_CANCEL_RECOMMENDED ||
        status === LEAVE_CANCEL_NOT_RECOMMENDED
      ) {
        return LEAVE_CANCEL_CALLBACK_ACTION_TYPES;
      }
      // else actions will be empty
      return [];
    }
  }
}

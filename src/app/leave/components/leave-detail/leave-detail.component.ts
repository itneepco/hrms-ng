import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";

import { AuthService } from "../../../auth/services/auth.service";
import { Addressee } from "../../../shared/models/adressee";
import {
  CL_CODE,
  EL_CODE,
  EL_HPL_ADMIN,
  HPL_CODE,
  HR_LEAVE_SUPER_ADMIN,
  RH_CODE,
} from "../../../shared/models/global-codes";
import { LeaveDetail } from "../../../shared/models/leave";
import { LeaveTypeService } from "../../../shared/services/leave-type.service";
import {
  APPROVE_ACTION_TYPES,
  CALLBACK_ACTION_TYPES,
  EL_HPL_ACTION_TYPES,
  JR_ACCEPTED,
  JR_PENDING,
  LEAVE_APPLIED,
  LEAVE_APPROVED,
  LEAVE_CALLBACKED,
  LEAVE_CANCEL_ACTION_TYPES,
  LEAVE_CANCEL_EL_HPL_ACTION_TYPES,
  LEAVE_CANCEL_INITIATION,
  LEAVE_CANCEL_NOT_RECOMMENDED,
  LEAVE_CANCEL_PROCESS_ACTION_TYPES,
  LEAVE_CANCEL_RECOMMENDED,
  LEAVE_CANCELLED,
  LEAVE_NOT_RECOMMENDED,
  LEAVE_PROCESSED_PAGE,
  LEAVE_RECOMMENDED,
  LEAVE_REQUEST_PAGE,
  PROCESS_ACTION_TYPES,
  TRANSACTION_PAGE,
} from "../../models/leave.codes";
import { LeaveCtrlOfficerService } from "../../services/leave-ctrl-officer.service";
import { LedgerService } from "../../services/ledger.service";
import { WorkflowActionService } from "../../services/workflow-action.service";
import { HD_CL_CODE } from "./../../../shared/models/global-codes";
import { LeaveApplication } from "./../../../shared/models/leave";
import { LeaveStatus } from "./../../models/leave-status";
import {
  LEAVE_CANCEL_CALLBACK_ACTION_TYPES,
  LEAVE_CANCEL_CALLBACKED,
  LEAVE_CANCEL_INITIATION_ACTION_TYPES,
} from "./../../models/leave.codes";
import { JoiningReportService } from "./../../services/joining-report.service";

@Component({
  selector: "app-leave-detail",
  templateUrl: "./leave-detail.component.html",
  styleUrls: ["./leave-detail.component.scss"]
})
export class LeaveDetailComponent implements OnInit, OnDestroy {
  panelOpenState = false;
  displayedColumns = [
    "position",
    "leave_type",
    "station_leave",
    "from_date",
    "to_date"
  ];
  leaveDetailSource: MatTableDataSource<LeaveDetail>;
  step = 0;
  isMulti = false;
  actionForm: FormGroup;
  actions = [];
  ctrlOfficers: Addressee[] = [];
  leaveStatuses: LeaveStatus[] = [];
  subscription: Subscription;
  leaveApp: LeaveApplication;
  isLoading = false;

  // Leave type codes
  cl_code = CL_CODE;
  hdcl_code = HD_CL_CODE;
  rh_code = RH_CODE;
  jr_accepted = JR_ACCEPTED;
  jr_pending = JR_PENDING;

  // Leave workflow action status code
  leave_applied = LEAVE_APPLIED;
  leave_recommended_code = LEAVE_RECOMMENDED;
  leave_approved_code = LEAVE_APPROVED;
  leave_callback_code = LEAVE_CALLBACKED;

  // Leave cancellation status code
  leave_cancelled = LEAVE_CANCELLED;
  leave_cancel_initiate = LEAVE_CANCEL_INITIATION;
  leave_cancel_recommended = LEAVE_CANCEL_RECOMMENDED;

  // Page code
  transactionPage = TRANSACTION_PAGE;
  leaveProcessedPage = LEAVE_PROCESSED_PAGE;
  leaveRequestPage = LEAVE_REQUEST_PAGE;

  constructor(
    private authService: AuthService,
    private leaveCtrlOfficer: LeaveCtrlOfficerService,
    public leaveType: LeaveTypeService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    public wActionService: WorkflowActionService,
    private ledgerService: LedgerService,
    private auth: AuthService,
    private joiningService: JoiningReportService,
    public dialogRef: MatDialogRef<LeaveDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    this.leaveApp = this.data.leave;
    this.leaveDetailSource = new MatTableDataSource(this.leaveApp.leaveDetails);
    this.initForm();
    this.actions = this.getActions();

    // Leave role mapper is not required on transaction page
    let leaveRoleMapper = true;
    if (this.data.pageNo === TRANSACTION_PAGE) {
      leaveRoleMapper = false;
    }
    // Fetch leave application forwarding authority
    this.leaveCtrlOfficer
      .getLeaveCtrlOfficers(
        this.authService.currentUser.emp_code,
        this.leaveApp.leaveDetails,
        leaveRoleMapper
      )
      .subscribe((ctrlOfficers: Addressee[]) => {
        this.ctrlOfficers = ctrlOfficers;
      });

    this.ledgerService
      .getLeaveStatus(this.leaveApp.emp_code)
      .subscribe((status: LeaveStatus[]) => {
        this.leaveStatuses = status;
      });

    this.subscription = this.workflow_action.valueChanges.subscribe(data => {
      if (
        data === LEAVE_RECOMMENDED ||
        data === LEAVE_CANCEL_INITIATION ||
        data === LEAVE_CANCEL_RECOMMENDED
      ) {
        this.addressee.setValidators(Validators.required);
      }
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  initForm() {
    this.actionForm = this.fb.group({
      workflow_action: ["", Validators.required],
      remarks: "",
      addressee: "",
      officer_emp_code: this.authService.currentUser.emp_code,
      leave_application_id: this.leaveApp.id
    });
  }

  onSubmit() {
    if (this.actionForm.invalid) {
      return;
    }

    const action = this.workflow_action.value;
    if (
      (action === LEAVE_RECOMMENDED || action === LEAVE_APPROVED) &&
      !this.checkBalance()
    ) {
      this.workflow_action.setErrors({ balance: true });
      return;
    }

    this.isLoading = true;
    const formValue = this.actionForm.value;
    this.wActionService.processLeave(formValue).subscribe(
      result => {
        this.isLoading = false;
        this.dialogRef.close("processed");
        this.snackbar.open(
          "Successfully processed the leave request",
          "Dismiss",
          {
            duration: 1600
          }
        );
      },
      error => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  // Find the leave workflow action types
  getActions() {
    const _status = this.leaveApp.status;
    const _addressee = this.leaveApp.addressee;

    // check if leave request page
    if (this.data.pageNo === LEAVE_REQUEST_PAGE) {
      if (
        _status === LEAVE_CANCEL_INITIATION ||
        _status === LEAVE_CANCEL_RECOMMENDED ||
        _status === LEAVE_CANCEL_CALLBACKED
      ) {
        if (
          this.leaveType.isEarnedLeave(this.leaveApp.leaveDetails) ||
          this.leaveType.isHalfPayLeave(this.leaveApp.leaveDetails)
        ) {
          // check if cancellation of EL or HPL application has been already recommended and forwarded to EL HPL Admin
          if (
            _status === LEAVE_CANCEL_RECOMMENDED &&
            (_addressee === EL_HPL_ADMIN ||
              _addressee === HR_LEAVE_SUPER_ADMIN) &&
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
        _status === LEAVE_APPLIED ||
        _status === LEAVE_RECOMMENDED ||
        _status === LEAVE_CALLBACKED
      ) {
        // check if the leave is earned leave or half pay leave
        if (
          this.leaveType.isEarnedLeave(this.leaveApp.leaveDetails) ||
          this.leaveType.isHalfPayLeave(this.leaveApp.leaveDetails)
        ) {
          // check if EL or ML has been already recommended and forwarded to EL HPL Admin
          if (
            _status === LEAVE_RECOMMENDED &&
            (_addressee === EL_HPL_ADMIN ||
              _addressee === HR_LEAVE_SUPER_ADMIN) &&
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

    if (this.data.pageNo === TRANSACTION_PAGE) {
      const joiningReport = this.leaveApp.joiningReport;
      // if leave is applied, recommended, the leave application can be callbacked by applied user
      if (_status == LEAVE_APPLIED || _status == LEAVE_RECOMMENDED) {
        return CALLBACK_ACTION_TYPES;
      }
      // If leave is approved then the employee can initiate leave cancellation and joining report is not accepted
      if (_status == LEAVE_APPROVED) {
        if (joiningReport && joiningReport.status == JR_ACCEPTED) {
          return [];
        }

        return LEAVE_CANCEL_INITIATION_ACTION_TYPES;
      }
      // If leave is cancellation is initialixed then the employee can callback
      if (_status === LEAVE_CANCEL_INITIATION) {
        return LEAVE_CANCEL_CALLBACK_ACTION_TYPES;
      }
      if (_status === LEAVE_CANCEL_CALLBACKED) {
        if (this.leaveApp.addressee.length < 1) {
          return LEAVE_CANCEL_INITIATION_ACTION_TYPES;
        }
        return LEAVE_CANCEL_CALLBACK_ACTION_TYPES;
      }
      // else actions will be empty
      return [];
    }

    if (this.data.pageNo === LEAVE_PROCESSED_PAGE) {
      // if leave is recommended or not recommended, the leave application can be callbacked by controlling user
      if (_status === LEAVE_RECOMMENDED || _status === LEAVE_NOT_RECOMMENDED) {
        return CALLBACK_ACTION_TYPES;
      }
      // if leave cancellation is recommended or not recommended, the leave application can be callbacked by controlling user
      if (
        _status === LEAVE_CANCEL_RECOMMENDED ||
        _status === LEAVE_CANCEL_NOT_RECOMMENDED
      ) {
        return LEAVE_CANCEL_CALLBACK_ACTION_TYPES;
      }
      // else actions will be empty
      return [];
    }
  }

  get addressee() {
    return this.actionForm.get("addressee");
  }

  get workflow_action() {
    return this.actionForm.get("workflow_action");
  }

  checkBalance(): boolean {
    const leaveDetails = this.leaveApp.leaveDetails;
    if (
      this.leaveType.isCasualLeave(this.leaveApp.leaveDetails) ||
      this.leaveType.isHalfDayCl(this.leaveApp.leaveDetails) ||
      this.leaveType.isRestrictedHoliday(this.leaveApp.leaveDetails)
    ) {
      const no_of_cl =
        this.leaveType.noOfCasualLeave(leaveDetails) +
        this.leaveType.noOfHalfDayCL(leaveDetails);

      const no_of_rh = this.leaveType.noOfRestrictedHoliday(leaveDetails);

      return no_of_cl <= this.cl_balance && no_of_rh <= this.rh_balance;
    }

    if (this.leaveType.isEarnedLeave(leaveDetails)) {
      return this.leaveType.noOfEarnedLeave(leaveDetails) <= this.el_balance;
    }

    if (this.leaveType.isHalfPayLeave(leaveDetails)) {
      return this.leaveType.noOfHalfPayLeave(leaveDetails) <= this.hpl_balance;
    }

    return false;
  }

  get cl_balance() {
    const leave = this.leaveStatuses.find(
      status => status.leave_code === CL_CODE
    );
    if (!leave) {
      return 0;
    }

    return leave.balance;
  }

  get rh_balance() {
    const leave = this.leaveStatuses.find(
      status => status.leave_code === RH_CODE
    );
    if (!leave) {
      return 0;
    }

    return leave.balance;
  }

  get el_balance() {
    const leave = this.leaveStatuses.find(
      status => status.leave_code === EL_CODE
    );
    if (!leave) {
      return 0;
    }

    return leave.balance;
  }

  get hpl_balance() {
    const leave = this.leaveStatuses.find(
      status => status.leave_code === HPL_CODE
    );
    if (!leave) {
      return 0;
    }

    return leave.balance;
  }

  getJRStatus(status: string) {
    return this.joiningService.getJRStatus(status);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

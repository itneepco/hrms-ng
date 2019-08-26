import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { WageMonthService } from 'src/app/attendance/services/wage-month.service';
import { AuthService } from "../../../auth/services/auth.service";
import { Addressee } from "../../../shared/models/adressee";
import { CL_CODE, EL_CODE, HPL_CODE, RH_CODE } from "../../../shared/models/global-codes";
import { LeaveDetail } from "../../../shared/models/leave";
import { LeaveTypeService } from "../../../shared/services/leave-type.service";
import { JR_ACCEPTED, JR_PENDING, LEAVE_APPLIED, LEAVE_APPROVED, LEAVE_CALLBACKED, LEAVE_CANCELLED, LEAVE_CANCEL_INITIATION, LEAVE_CANCEL_RECOMMENDED, LEAVE_PROCESSED_PAGE, LEAVE_RECOMMENDED, LEAVE_REQUEST_PAGE, TRANSACTION_PAGE } from "../../models/leave.codes";
import { LeaveCtrlOfficerService } from "../../services/leave-ctrl-officer.service";
import { LedgerService } from "../../services/ledger.service";
import { WorkflowActionService } from "../../services/workflow-action.service";
import { HD_CL_CODE } from "./../../../shared/models/global-codes";
import { LeaveApplication } from "./../../../shared/models/leave";
import { LeaveStatus } from "./../../models/leave-status";
import { JoiningReportService } from "./../../services/joining-report.service";
import { UserActionService } from "./../../services/user-action.service";

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
  pageNo: string;
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
    private userActionService: UserActionService,
    private joiningService: JoiningReportService,
    private wageMonthService: WageMonthService,
    public dialogRef: MatDialogRef<LeaveDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    this.leaveApp = this.data.leave;
    this.pageNo = this.data.pageNo;

    this.wageMonthService.getActiveWageMonth().subscribe(activeWageMonth => {
      this.actions = this.userActionService.getActions(
        this.leaveApp,
        this.pageNo,
        activeWageMonth
      );
    })

    this.leaveDetailSource = new MatTableDataSource(this.leaveApp.leaveDetails);
    this.initForm();

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
        this.snackbar.open(
          "An error occured!! Please try again later!!",
          "Dismiss",
          {
            duration: 1600
          }
        );
      }
    );
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

    if (!leave) return 0;
    return leave.balance;
  }

  get rh_balance() {
    const leave = this.leaveStatuses.find(
      status => status.leave_code === RH_CODE
    );

    if (!leave) return 0;
    return leave.balance;
  }

  get el_balance() {
    const leave = this.leaveStatuses.find(
      status => status.leave_code === EL_CODE
    );

    if (!leave) return 0;
    return leave.balance;
  }

  get hpl_balance() {
    const leave = this.leaveStatuses.find(
      status => status.leave_code === HPL_CODE
    );

    if (!leave) return 0;
    return leave.balance;
  }

  getJRStatus(status: string) {
    return this.joiningService.getJRStatus(status);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

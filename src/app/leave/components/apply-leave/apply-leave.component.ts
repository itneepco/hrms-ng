import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { HierarchyService } from '../../../admin/services/hierarchy.service';
import { AuthService } from '../../../auth/services/auth.service';
import { EL_CODE, HPL_CODE } from '../../../shared/models/global-codes';
import { LeaveAppForm, LeaveStatus } from '../../../shared/models/leave';
import { LeaveService } from '../../services/leave.service';
import { LedgerService } from '../../services/ledger.service';
import { DateValidator } from '../../validators/date-validator';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.scss']
})
export class ApplyLeaveComponent implements OnInit , OnDestroy {
  leaveForm: FormGroup
  leaveStatuses: LeaveStatus[] = []
  ctrlOfficers = []
  code: string
  el_code = EL_CODE
  hpl_code = HPL_CODE
  subscription: Subscription
  
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private hierarchyService: HierarchyService,
    private ledgerService: LedgerService,
    private leaveService: LeaveService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.ledgerService.getLeaveStatus(this.authService.currentUser.emp_code)
      .subscribe((status: LeaveStatus[]) => {
        this.leaveStatuses = status
      })  

    this.hierarchyService.getParents(this.authService.currentUser.emp_code)
      .subscribe((ctrlOfficers: any[]) => {
        this.ctrlOfficers = ctrlOfficers
      })
    
    this.subscription = this.route.params.subscribe(params => {
      this.code = params['id'];
    });  

    this.initializeForm()
  }

  initializeForm() {
    this.leaveForm = this.fb.group({
      officer_emp_code: ['', Validators.required],
      purpose: ['', Validators.required],
      address: ['', Validators.required],
      contact_no: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      from_date: ['', Validators.required],
      to_date: ['', Validators.required],
      station_leave: false,
      prefix_from: '',
      prefix_to: '',
      suffix_from: '',
      suffix_to: ''
    }, 
    { validator: [
        DateValidator.fromToDateValidator,
        DateValidator.prefFromToValidator,
        DateValidator.suffFromToValidator,
        EL_CODE ? this.checkElBalance.bind(this) : this.checkHPLBalance.bind(this)
      ]
    })
  }

  applyLeave() {
    if(this.leaveForm.invalid) return

    let leave_detail = [{
      from_date: this.from_date.value,
      to_date: this.to_date.value,
      leave_type: this.code == HPL_CODE ? HPL_CODE : EL_CODE,
      station_leave: this.station_leave.value
    }]

    let leavApplication: LeaveAppForm = Object.assign(this.leaveForm.value, 
      { leave_details: leave_detail, emp_code: this.authService.currentUser.emp_code });

    // console.log(leavApplication)
    this.leaveService.applyLeave(leavApplication).subscribe(result => { 
      console.log(result)
      this.router.navigateByUrl('leave/leave-transaction')
    })  
  }


  get officer_emp_code() {
    return this.leaveForm.get('officer_emp_code')
  }
  
  get purpose() {
    return this.leaveForm.get('purpose')
  }

  get contact_no() {
    return this.leaveForm.get('contact_no')
  }

  get address() {
    return this.leaveForm.get('address')
  }

  get from_date() {
    return this.leaveForm.get('from_date')
  }

  get to_date() {
    return this.leaveForm.get('to_date')
  }

  get station_leave() {
    return this.leaveForm.get('station_leave')
  }

  get prefix_from() {
    return this.leaveForm.get('prefix_from')
  }

  get prefix_to() {
    return this.leaveForm.get('prefix_to')
  }

  get suffix_from() {
    return this.leaveForm.get('suffix_from')
  }

  get suffix_to() {
    return this.leaveForm.get('suffix_to')
  }

  get el_balance(): number {
    let leave = this.leaveStatuses.find(status => status.leave_code == EL_CODE)
    if(!leave) return 0

    return leave.balance
  }

  get hpl_balance(): number {
    let leave = this.leaveStatuses.find(status => status.leave_code == HPL_CODE)
    if(!leave) return 0

    return leave.balance
  }

  checkElBalance(control: AbstractControl): ValidationErrors | null {
    let from_date = new Date(control.get('from_date').value)
    let to_date = new Date(control.get("to_date").value)
    
    let no_of_el = ((to_date.valueOf() - from_date.valueOf()) / (60*60*24*1000)) + 1
    if(no_of_el > this.el_balance) {
      console.log("Insufficient Earned Leave Balance", no_of_el, this.el_balance)
      control.get("to_date").setErrors({ elBalance: true })
    }

    return null;    
  }  

  checkHPLBalance(control: AbstractControl): ValidationErrors | null {
    let from_date = new Date(control.get('from_date').value)
    let to_date = new Date(control.get("to_date").value)
    
    let no_of_el = ((to_date.valueOf() - from_date.valueOf()) / (60*60*24*1000)) + 1
    if(no_of_el > this.hpl_balance) {
      console.log("Insufficient Half Pay Leave Balance")
      control.get("to_date").setErrors({ hplBalance: true })
    }

    return null;    
  }  

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}

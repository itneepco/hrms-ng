import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

import { Employee } from '../../../shared/models/employee';
import { EMPLOYEE_ROLES } from '../../../shared/models/global-codes';
import { Project } from '../../../shared/models/project.model';
import { RoleMapper } from '../../../shared/models/role-mapper';
import { EmployeeService } from '../../../shared/services/employee.service';
import { ProjectService } from '../../../shared/services/project.service';
import { RoleMapperService } from '../../services/role-mapper.service';

@Component({
  selector: 'app-roleMapper-list',
  templateUrl: './role-mapper.component.html',
  styleUrls: ['./role-mapper.component.scss']
})
export class RoleMapperComponent implements OnInit, OnDestroy {
  roleMapper_types = ["CH", "RH"]
  projects: Project[]
  emp_roles = EMPLOYEE_ROLES
  displayedColumns = ["position", "project_id", "role", "emp_code", "actions"]
  dataSource: MatTableDataSource<RoleMapper>
  errMsg: string
  isLoading = true
  roleMapperForm: FormGroup
  _roleMapper: RoleMapper = {} as RoleMapper
  searchResult: Employee[] = []
  isSubmitting: boolean = false

  // Pagination variables 
  dataLength = 0
  pageSize = 10
  pageIndex = 0

  //Subscriptions
  empCodeSubs: Subscription

  constructor(private roleMapperService: RoleMapperService,
    private projectService: ProjectService,
    private snackbar: MatSnackBar,
    private employeeService: EmployeeService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeForm()
    this.getRoleMappers()

    this.empCodeSubs = this.emp_code.valueChanges.pipe(debounceTime(500)).subscribe(data => {
      if(!data) return
      if(data.length < 1) return
      // console.log(data)
      this.employeeService.searchEmployee(data)
        .subscribe(response => {
          // console.log(response)
          this.searchResult = response
        })
    })
  }

  getRoleMappers() {
    this.projectService.getProjects()
      .pipe(
        switchMap((projects: Project[]) => { 
          this.projects = projects
          return this.roleMapperService.getRoleMappers(this.pageIndex, this.pageSize)
        })
      )
      .subscribe(data => {
          this.dataLength = data['count']
          this.dataSource = new MatTableDataSource<RoleMapper>(data['rows'])
          this.isLoading = false
        },
        errMsg => {
          this.errMsg = errMsg
          this.isLoading = false
        }
      )
  }
  
  initializeForm() {
    this.roleMapperForm = this.fb.group({
      project_id: [this._roleMapper.project_id, [Validators.required]],
      role: [this._roleMapper.role, [Validators.required]],
      emp_code: [this._roleMapper.emp_code, [Validators.required, Validators.pattern('[0-9]{6}')]]
    })
  }

  onSubmit() {
    let roleMapperFormValue = <RoleMapper> this.roleMapperForm.value

    this.isSubmitting = true
    if(this._roleMapper.id) {
      this.roleMapperService.editRoleMapper(this._roleMapper.id, roleMapperFormValue).subscribe(
        (roleMapper: RoleMapper) => {
          this.isSubmitting = false
          let index = this.dataSource.data.indexOf(this._roleMapper)
          let temp = this.dataSource.data
          temp.splice(index, 1)
          temp.unshift(roleMapper)
          this.dataSource.data = temp
          
          this._roleMapper = {} as RoleMapper
          this.snackbar.open("Successfully updated the roleMapper record", "Dismiss", {
            duration: 1600
          })
        }, error => {
          console.log(error)
          this.isSubmitting = false
        }
      )
    }
    else {
      this.roleMapperService.addRoleMapper(roleMapperFormValue).subscribe(
        (roleMapper: RoleMapper) => {
          this.isSubmitting = false
          let temp = this.dataSource.data
          temp.splice(0, 0, roleMapper)
          this.dataSource.data = temp
          this.snackbar.open("Successfully created the roleMapper record", "Dismiss", {
            duration: 1600
          })
        }, error => {
          console.log(error)
          this.isSubmitting = false
        }
      )
    }
    
    this.roleMapperForm.reset()
    Object.keys(this.roleMapperForm.controls).forEach((name) => {
      let control = this.roleMapperForm.controls[name];
      control.setErrors(null);
    });
  }

  onEdit(roleMapper: RoleMapper) {
    this._roleMapper = roleMapper
    this.initializeForm()
  }

  onRemove(roleMapper: RoleMapper) {
    let retVal = confirm("Are you sure you want to delete?")
    if(retVal == true) { 
      this.roleMapperService.deleteRoleMapper(roleMapper.id)
        .subscribe(() => {
          let index = this.dataSource.data.indexOf(roleMapper)
          let temp = this.dataSource.data
          temp.splice(index, 1)
          this.dataSource.data = temp
        })
      
        this.snackbar.open("Successfully deleted the roleMapper record", "Dismiss", {
        duration: 1600
      })  
    }
  }

  changePage(pageEvent: PageEvent) {
    this.pageIndex = pageEvent.pageIndex
    this.pageSize = pageEvent.pageSize
    this.getRoleMappers()
  } 

  get emp_code() {
    return this.roleMapperForm.get('emp_code')
  }
  get project_id() {
    return this.roleMapperForm.get('project_id')
  }
  get role() {
    return this.roleMapperForm.get('role')
  }

  ngOnDestroy() {
    this.empCodeSubs.unsubscribe()
  }
}

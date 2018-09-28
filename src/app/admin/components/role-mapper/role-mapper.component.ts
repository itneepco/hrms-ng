import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';

import { Project } from '../../../shared/model/project.model';
import { ProjectService } from '../../../shared/services/project.service';
import { RoleMapper } from '../../model/role-mapper';
import { RoleMapperService } from '../../services/role-mapper.service';
import { EMPLOYEE_ROLES } from '../../model/global-code';

@Component({
  selector: 'app-roleMapper-list',
  templateUrl: './role-mapper.component.html',
  styleUrls: ['./role-mapper.component.scss']
})
export class RoleMapperComponent implements OnInit {
  roleMapper_types = ["CH", "RH"]
  projects: Project[]
  emp_roles = EMPLOYEE_ROLES
  displayedColumns = ["position", "project_code", "role", "emp_code", "actions"]
  dataSource: MatTableDataSource<RoleMapper>
  errMsg: string
  isLoading = true
  roleMapperForm: FormGroup
  _roleMapper: RoleMapper = {} as RoleMapper

  // Pagination variables 
  dataLength = 0
  pageSize = 10
  pageIndex = 0

  constructor(private roleMapperService: RoleMapperService,
    private projectService: ProjectService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeForm()
    this.getRoleMappers()
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
      project_code: [this._roleMapper.project_code, [Validators.required]],
      role: [this._roleMapper.role, [Validators.required]],
      emp_code: [this._roleMapper.emp_code, [Validators.required]]
    })
  }

  onSubmit() {
    let roleMapperFormValue = <RoleMapper> this.roleMapperForm.value
    console.log(this.roleMapperForm.value)

    if(this._roleMapper.id) {
      this.roleMapperService.editRoleMapper(this._roleMapper.id, roleMapperFormValue).subscribe(
        (roleMapper: RoleMapper) => {
          let index = this.dataSource.data.indexOf(this._roleMapper)
          let temp = this.dataSource.data
          temp.splice(index, 1)
          temp.unshift(roleMapper)
          this.dataSource.data = temp
          
          this._roleMapper = {} as RoleMapper
          this.snackbar.open("Successfully updated the roleMapper record", "Dismiss", {
            duration: 1600
          })
        }
      )
    }
    else {
      this.roleMapperService.addRoleMapper(roleMapperFormValue).subscribe(
        (roleMapper: RoleMapper) => {
          let temp = this.dataSource.data
          temp.splice(0, 0, roleMapper)
          this.dataSource.data = temp
          this.snackbar.open("Successfully created the roleMapper record", "Dismiss", {
            duration: 1600
          })
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
  get project_code() {
    return this.roleMapperForm.get('project_code')
  }
  get role() {
    return this.roleMapperForm.get('role')
  }
}

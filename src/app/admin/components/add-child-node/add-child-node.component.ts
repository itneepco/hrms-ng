import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { EmployeeService } from '../../../shared/services/employee.service';
import { TreeNode } from '../../model/employee-node';
import { Hierarchy } from './../../model/employee-node';
import { HierarchyService } from './../../services/hierarchy.service';

@Component({
  selector: 'app-add-child-node',
  templateUrl: './add-child-node.component.html',
  styleUrls: ['./add-child-node.component.scss']
})
export class AddChildNodeComponent implements OnInit, OnDestroy {
  isSearching = false;
  emp_code: FormControl;
  node: TreeNode;
  errMsg: string;
  empCodeSubs: Subscription;
  searchResult = [];

  constructor(
    private hierarchyService: HierarchyService,
    @Inject(MAT_DIALOG_DATA) public dialogData: Hierarchy,
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<AddChildNodeComponent>) { }

  ngOnInit() {
    console.log(this.dialogData)
    this.emp_code = new FormControl()

    this.empCodeSubs = this.emp_code.valueChanges.pipe(debounceTime(500)).subscribe(data => {
      if(!data) return
      if(data.length < 1) return
      
      this.employeeService.searchEmployee(data)
        .subscribe(response => {
          this.searchResult = response
        })
    })
  }   

  onSearch() {
    if(!this.emp_code) return

    this.isSearching = true
    this.hierarchyService.searchEmployee(this.emp_code.value)
      .subscribe(
        node => {
          this.isSearching = false
          this.node = node
        },
        errMsg => this.errMsg = errMsg
      )
  }

  addChild() {
    let hierarchyNode = {} as Hierarchy
    hierarchyNode.emp_code = this.emp_code.value
    hierarchyNode.parent_emp_code = this.dialogData.parent_emp_code
    
    this.hierarchyService.addChildNode(hierarchyNode)
      .subscribe(() => this.dialogRef.close({ action: "add"}))
  }

  changeParent() {
    let newNode = {} as Hierarchy
    newNode.emp_code = this.dialogData.emp_code
    newNode.parent_emp_code = this.emp_code.value
    
    this.hierarchyService.addChildNode(newNode)
      .subscribe(() => this.dialogRef.close({ action: "add"}))
  }

  ngOnDestroy() {
    this.empCodeSubs.unsubscribe()
  }
}

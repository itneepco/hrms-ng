import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { HierarchyService } from '../../services/hierarchy.service';
import { AddChildNodeComponent } from '../add-child-node/add-child-node.component';
import { EmployeeNode, TreeNode } from './../../model/employee-node';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { EmployeeService } from '../../../shared/services/employee.service';

@Component({
  selector: 'app-hierarchy-home',
  templateUrl: './hierarchy-home.component.html',
  styleUrls: ['./hierarchy-home.component.scss']
})
export class HierarchyHomeComponent implements OnInit, OnDestroy {
  node: EmployeeNode;
  isSearching = false;
  emp_code: FormControl;
  errMsg: string;
  displayedColumns = ["emp_code", "name", "designation", "project", "actions"];
  empCodeSubs: Subscription;
  searchResult = [];

  constructor(private hierarchyService: HierarchyService,
    private employeeService: EmployeeService, 
    private dialog: MatDialog) { }
  
  ngOnInit() {
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
    this.errMsg = null
    
    if (!this.emp_code) return

    if(this.searchResult.length < 1) {
      this.errMsg = "No such employee code exists in this office / project. Please try again!!"
      return
    }
    
    this.isSearching = true
    this.hierarchyService.getEmployeeNode(this.emp_code.value)
      .subscribe(
        node => {
          this.node = node
          this.isSearching = false
        },
        errMsg => {
          this.errMsg = errMsg
          this.isSearching = false 
        }
      )
  }

  onChangeParent() {
    this.openDialog({ emp_code: this.emp_code.value })
  }

  removeChild(childNode: TreeNode) {
    let retVal = confirm("Are you sure you want to delete?")
    if(retVal == true) {
      this.hierarchyService.removeChildNode(childNode.id)
        .subscribe(() => {
          this.hierarchyService.getEmployeeNode(this.emp_code.value)
            .subscribe(node => this.node = node)
        })
    }
  }

  addChild() {
    this.openDialog({ parent_emp_code: this.emp_code.value })
  }

  private openDialog(data) {
    let dialogRef = this.dialog.open(AddChildNodeComponent, {
      width: '550px',
      height: '400px',
      data: data
    })

    dialogRef.afterClosed().subscribe((data) => {
      if(data && data.action == "add") {
        this.hierarchyService.getEmployeeNode(this.emp_code.value).subscribe(node => this.node = node)
      }
    })
  }

  getFullName(item) {
    return `${item.first_name} ${item.middle_name} ${item.last_name}, ${item.designation}` 
  }

  ngOnDestroy() {
    this.empCodeSubs.unsubscribe()
  }
}
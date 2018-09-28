import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { HierarchyService } from '../../services/hierarchy.service';
import { AddChildNodeComponent } from '../add-child-node/add-child-node.component';
import { EmployeeNode, TreeNode } from './../../shared/employee-node';

@Component({
  selector: 'app-hierarchy-home',
  templateUrl: './hierarchy-home.component.html',
  styleUrls: ['./hierarchy-home.component.scss']
})
export class HierarchyHomeComponent {
  node: EmployeeNode;
  isSearching = false;
  emp_code: string;
  errMsg: string;
  displayedColumns = ["emp_code", "name", "designation", "project", "actions"];

  constructor(private hierarchyService: HierarchyService, private dialog: MatDialog) { }

  onSearch() {
    if (!this.emp_code) return
    this.isSearching = true
    this.hierarchyService.getEmployeeNode(this.emp_code)
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

  onEdit() {
    this.openDialog({ emp_code: this.emp_code })
  }

  removeChild(childNode: TreeNode) {
    this.hierarchyService.removeChildNode(childNode.id)
      .subscribe(() => {
        this.hierarchyService.getEmployeeNode(this.emp_code)
          .subscribe(node => this.node = node)
      })
  }

  addChild() {
    this.openDialog({ parent_emp_code: this.emp_code })
  }

  private openDialog(data) {
    let dialogRef = this.dialog.open(AddChildNodeComponent, {
      width: '550px',
      height: '400px',
      data: data
    })

    dialogRef.afterClosed().subscribe((data) => {
      if(data && data.action == "add") {
        this.hierarchyService.getEmployeeNode(this.emp_code).subscribe(node => this.node = node)
      }
    })
  }
}
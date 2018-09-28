import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { TreeNode } from '../../model/employee-node';
import { HierarchyService } from './../../services/hierarchy.service';
import { Hierarchy } from './../../model/employee-node';

@Component({
  selector: 'app-add-child-node',
  templateUrl: './add-child-node.component.html',
  styleUrls: ['./add-child-node.component.scss']
})
export class AddChildNodeComponent {
  isSearching = false;
  emp_code: string;
  node: TreeNode;
  errMsg: string;

  constructor(
    private hierarchyService: HierarchyService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddChildNodeComponent>) { }

  onSearch() {
    if(!this.emp_code) return

    this.isSearching = true
    this.hierarchyService.searchEmployee(this.emp_code)
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
    hierarchyNode.emp_code = this.emp_code
    hierarchyNode.parent_emp_code = this.data.parent_emp_code
    
    this.hierarchyService.addChildNode(hierarchyNode)
      .subscribe(() => this.dialogRef.close({ action: "add"}))
  }

  changeParent() {
    let hierarchyNode = {} as Hierarchy
    hierarchyNode.emp_code = this.data.emp_code
    hierarchyNode.parent_emp_code = this.emp_code

    this.hierarchyService.addChildNode(hierarchyNode)
      .subscribe(() => this.dialogRef.close({ action: "add"}))
  }

}

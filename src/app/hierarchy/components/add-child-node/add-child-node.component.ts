import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { TreeNode } from '../../shared/employee-node';
import { HierarchyService } from './../../services/hierarchy.service';

@Component({
  selector: 'app-add-child-node',
  templateUrl: './add-child-node.component.html',
  styleUrls: ['./add-child-node.component.scss']
})
export class AddChildNodeComponent implements OnInit {
  isSearching = false;
  emp_code: string;
  node: TreeNode;
  errMsg: string;

  constructor(
    private hierarchyService: HierarchyService,
    public dialogRef: MatDialogRef<AddChildNodeComponent>) { }

  ngOnInit() {
  }

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

}

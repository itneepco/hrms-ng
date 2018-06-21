import { HierarchyService } from './../../services/hierarchy.service';
import { TreeNode } from '../../shared/employee-node';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-child-node',
  templateUrl: './add-child-node.component.html',
  styleUrls: ['./add-child-node.component.scss']
})
export class AddChildNodeComponent implements OnInit {
  isSearching = false;
  emp_code: string;
  node: TreeNode;

  constructor(
    private hierarchyService: HierarchyService,
    public dialogRef: MatDialogRef<AddChildNodeComponent>) { }

  ngOnInit() {
  }

  onSearch() {
    this.isSearching = true
    this.node = undefined

    setTimeout(() => { 
      this.isSearching = false 
      this.node = this.hierarchyService.searchEmployee(this.emp_code)
    }, 2000)
  }

}

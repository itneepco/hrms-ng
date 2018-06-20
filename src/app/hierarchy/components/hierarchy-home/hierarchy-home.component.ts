import { EmployeeNode, TreeNode } from './../../shared/employee-node';
import { HierarchyService } from '../../services/hierarchy.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddChildNodeComponent } from '../add-child-node/add-child-node.component';

@Component({
  selector: 'app-hierarchy-home',
  templateUrl: './hierarchy-home.component.html',
  styleUrls: ['./hierarchy-home.component.scss']
})
export class HierarchyHomeComponent {
  isSearching = false;
  node: EmployeeNode
  emp_code: string;
  subordinates: TreeNode[];
  displayedColumns = [ "emp_code", "name", "designation", "project", "actions" ];

  constructor(private hierarchyService: HierarchyService, private dialog: MatDialog) { }

  onSearch() {
    this.isSearching = true
    this.node = undefined
    setTimeout(() => { 
      this.isSearching = false 
      this.node = this.hierarchyService.getEmployeeNode(this.emp_code);
      this.subordinates = this.node.children
    }, 2000)
  }

  removeChild() {

  }

  addChild() {
    this.dialog.open(AddChildNodeComponent, {
      width: '550px',
      height: '400px'
    })
  }
}
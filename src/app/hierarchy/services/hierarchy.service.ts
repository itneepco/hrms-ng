import { TreeNode, EmployeeNode } from '../shared/employee-node';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HierarchyService {

  constructor() { }

  getEmployeeNode(empCode: string) {
    let node = {} as EmployeeNode

    node.id = 1
    node.first_name = "Nepuni"
    node.last_name = "Pfotte"
    node.designation = "Assistant Manager"
    node.project = "AGBP"
    node.emp_code = "006368"
    node.children = [
      {
        id: 2,
        first_name: "Dinesh",
        last_name: "Goswami",
        designation: "LVD(SG)",
        project: "AGBP",
        emp_code: "002274",
      }
    ]

    return node
  }

  searchEmployee(empCode: string): TreeNode {
    return {
      id: 2,
      first_name: "Dinesh",
      last_name: "Goswami",
      designation: "LVD(SG)",
      project: "AGBP",
      emp_code: "002274",
    }
  }

  addChildNode(node: TreeNode) {

  }

  removeChildNode(node: TreeNode) {

  }

  deleteEmployeeNode(empCode: string) {

  }

  updateEmployeeNode(empNode: EmployeeNode) {

  }
}

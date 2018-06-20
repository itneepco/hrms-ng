export interface TreeNode {
  id: number
  emp_code: string
  first_name: string
  last_name: string
  project: string
  designation: string
}

export interface EmployeeNode extends TreeNode {
  parent_emp_code: string
  parent_first_name: string
  parent_last_name: string
  parent_designation: string

  children: TreeNode[]
}
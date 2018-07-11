export interface TreeNode {
  id: number
  emp_code: string
  first_name: string
  last_name: string
  project: string
  designation: string
}

export interface EmployeeNode extends TreeNode {
  id: number
  parent: TreeNode
  children: TreeNode[]
}

export interface Hierarchy {
  id: number
  emp_code: string
  parent_code: string
}
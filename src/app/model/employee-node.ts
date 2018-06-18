export interface EmployeeNode {
    id: string
    name: string
    lft: number
    rgt: number
    children?: EmployeeNode[]
}
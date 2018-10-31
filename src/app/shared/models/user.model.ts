import { RoleMapper } from "./role-mapper";

export interface User {
  emp_code: string;
  name: string;
  role: number;
  project: number;
  roleMapper: RoleMapper[];
}
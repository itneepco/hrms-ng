import { Nominee } from "./Nominee";

export interface MemberData {
  pfNo: string;
  un: string;
  firstName: string;
  lastName: string;
  dob: string;
  doj: string;
  dol: string;
  nominees: Nominee[];
}

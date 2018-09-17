import { LeaveApplication } from './leave';
export const request: LeaveApplication[] = [
  {
      "id": 24,
      "emp_code": "006368",
      "first_name": "Nepuni",
      "last_name": "Pfotte",
      "purpose": "test",
      "address": "test",
      "contact_no": "1234567890",
      "created_at": "2018-09-13T02:25:23.000Z",
      "history": [
          {
              "id": 15,
              "officer": {
                  "emp_code": "006019",
                  "first_name": "PARASH",
                  "last_name": "GOSWAMI"
              },
              "workflowAction": {
                  "id": 1,
                  "action_name": "Leave Applied"
              },
              "updated_at": "2018-09-13T02:25:23.000Z",
              "isCurrent": true
          }
      ],
      "leaveDays": [
          {
              "id": 11,
              "leaveType": {
                  "id": 1,
                  "ltype": "CL"
              },
              "from_date": "2018-09-13",
              "to_date": "2018-09-13"
          }
      ]
  }
]
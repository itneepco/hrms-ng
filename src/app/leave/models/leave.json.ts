import { Leave } from './leave';

export const leaves: Leave[] = [
  {
      "id": 18,
      "emp_code": "006368",
      "purpose": "test",
      "address": "asdas",
      "contact_no": "1234354356",
      "created_at": "2018-09-06T02:24:18.000Z",
      "history": [
          {
              "id": 10,
              "officer": {
                  "emp_code": "005332",
                  "first_name": "THOKCHOM",
                  "last_name": "SINGH"
              },
              "workflowAction": {
                  "id": 1,
                  "action_name": "Leave Applied"
              },
              "updated_at": "2018-09-06T02:24:18.000Z"
          }
      ],
      "leaveDays": [
          {
              "id": 4,
              "leaveType": {
                  "id": 1,
                  "ltype": "CL"
              },
              "from_date": "2018-09-06",
              "to_date": "2018-09-06"
          },
          {
              "id": 5,
              "leaveType": {
                  "id": 1,
                  "ltype": "CL"
              },
              "from_date": "2018-09-07",
              "to_date": "2018-09-07"
          }
      ]
  },
  {
      "id": 19,
      "emp_code": "006368",
      "purpose": "Apply CL",
      "address": "HQ",
      "contact_no": "9874563210",
      "created_at": "2018-09-06T02:29:58.000Z",
      "history": [
          {
              "id": 11,
              "officer": {
                  "emp_code": "005332",
                  "first_name": "THOKCHOM",
                  "last_name": "SINGH"
              },
              "workflowAction": {
                  "id": 1,
                  "action_name": "Leave Applied"
              },
              "updated_at": "2018-09-06T02:29:58.000Z"
          }
      ],
      "leaveDays": [
          {
              "id": 6,
              "leaveType": {
                  "id": 1,
                  "ltype": "CL"
              },
              "from_date": "2018-09-06",
              "to_date": "2018-09-06"
          }
      ]
  },
  {
      "id": 20,
      "emp_code": "006368",
      "purpose": "Test",
      "address": "Shilllong",
      "contact_no": "9874561310",
      "created_at": "2018-09-06T02:30:59.000Z",
      "history": [
          {
              "id": 12,
              "officer": {
                  "emp_code": "005332",
                  "first_name": "THOKCHOM",
                  "last_name": "SINGH"
              },
              "workflowAction": {
                  "id": 1,
                  "action_name": "Leave Applied"
              },
              "updated_at": "2018-09-06T02:30:59.000Z"
          }
      ],
      "leaveDays": [
          {
              "id": 7,
              "leaveType": {
                  "id": 1,
                  "ltype": "CL"
              },
              "from_date": "2018-09-12",
              "to_date": "2018-09-12"
          }
      ]
  },
  {
      "id": 21,
      "emp_code": "006368",
      "purpose": "asd",
      "address": "dasdsa",
      "contact_no": "1234567890",
      "created_at": "2018-09-06T02:33:13.000Z",
      "history": [
          {
              "id": 13,
              "officer": {
                  "emp_code": "005332",
                  "first_name": "THOKCHOM",
                  "last_name": "SINGH"
              },
              "workflowAction": {
                  "id": 1,
                  "action_name": "Leave Applied"
              },
              "updated_at": "2018-09-06T02:33:13.000Z"
          }
      ],
      "leaveDays": [
          {
              "id": 8,
              "leaveType": {
                  "id": 1,
                  "ltype": "CL"
              },
              "from_date": "2018-09-17",
              "to_date": "2018-09-17"
          }
      ]
  }
]
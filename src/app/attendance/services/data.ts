export const data = [
  {
    id: 1,
    day: "2020-02-10",
    status: "01",
    applier: {
      emp_code: "006584",
      emp_name: "Biplab Bharali",
      designation: "Assistant I"
    },
    isMutual: true,
    mutual_emp_code: '006543',
    applicationHistory: [
      {
        id: 1,
        officer: {
          emp_code: "006584",
          emp_name: "Biplab Bharali",
          designation: "Assistant I"
        },
        workflow_action: "01",
        remarks: "Applied",
        updated_at: "2020-02-16"
      }
    ],
    reason: "Forgot to punch out time"
  }
];

export const my_punchings = {
  attendance: {
    shift: {
      name: "General",
      is_general: true
    },
    in_time: "09:50",
    out_time: "",
    status: "02"
  },
  punchings: [
    {
      punching_time: "09:50",
      machine_no: "032"
    },
    {
      punching_time: "09:51",
      machine_no: "033"
    },
  ]
};

export const mutual_punchings = {
  employee: {
    emp_code: '006543',
    emp_name: "Utpal Handique",
    designation: "Assistant I",
  },
  attendance: {
    shift: {
      name: "General",
      is_general: true
    },
    in_time: "09:50",
    out_time: "17:30",
    status: "01"
  },
  punchings: [
    {
      punching_time: "09:50",
      machine_no: "032"
    },
    {
      punching_time: "09:51",
      machine_no: "033"
    },
    {
      punching_time: "17:30",
      machine_no: "033"
    },
  ]
};
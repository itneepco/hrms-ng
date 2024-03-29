export class PfMonthlyData {
  empCont: number;
  empWithdrawal: number;
  emplCont: number;
  emplWithdrawal: number;
  pensionAmt: number;
  volCont: number;
  wageMon: number;

  constructor() {
    this.empCont = 0;
    this.empWithdrawal = 0;
    this.emplCont = 0;
    this.emplWithdrawal = 0;
    this.pensionAmt = 0;
    this.volCont = 0;
    this.wageMon = 0;
  }
}

export class PensionMonthlyData {
  empCont: number;
  empArrear: number;
  emplCont: number;
  emplArrear: number;
  volCont: number;
  wageMon: number;

  constructor() {
    this.empCont = 0;
    this.empArrear = 0;
    this.emplCont = 0;
    this.emplArrear = 0;
    this.volCont = 0;
    this.wageMon = 0;
  }
}

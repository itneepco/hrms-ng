import { AbstractControl, ValidationErrors } from "@angular/forms";

export class DateValidator {

  static fromToDateValidator(control: AbstractControl): ValidationErrors | null {
    let from_date = control.get('from_date').value;
    let to_date = control.get("to_date").value;

    if(to_date && from_date && to_date < from_date) { 
      console.log("To Date should be greater than from Date")
      return { fromToDate: true }
    }
    
    return null;    
  }  
  
  static suffFromToValidator(control: AbstractControl): ValidationErrors | null {
    let suffix_from = control.get('suffix_from').value;
    let suffix_to = control.get("suffix_to").value;

    if(suffix_to && suffix_from && suffix_to < suffix_from) { 
      console.log("Suffix To Date should be greater than from Date")
      return { suffFromTo: true }
    }

    return null;    
  }  

  static prefFromToValidator(control: AbstractControl): ValidationErrors | null {
    let prefix_from = control.get('prefix_from').value;
    let prefix_to = control.get("prefix_to").value;

    if(prefix_to && prefix_from && prefix_to < prefix_from) {
      console.log("Prefix To Date should be greater than from Date")
      return { prefFromTo: true }
    }

    return null;    
  }  
}
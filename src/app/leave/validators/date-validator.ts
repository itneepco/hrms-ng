import { AbstractControl, ValidationErrors } from "@angular/forms";

export class DateValidator {

  static fromToDateValidator(control: AbstractControl): ValidationErrors | null {
    let from_date = control.get('from_date').value;
    let to_date = control.get("to_date").value;

    console.log("validate")

    if(from_date != to_date) 
      return { fromToDate: true }
    
    return null;    
  }  
  
  static suffFromToValidator(control: AbstractControl): ValidationErrors | null {
    let suffix_from = control.get('suffix_from').value;
    let suffix_to = control.get("suffix_to").value;

    if(suffix_from > suffix_to) 
      return { suffFromTo: true }
    
    return null;    
  }  

  static prefFromToValidator(control: AbstractControl): ValidationErrors | null {
    let prefix_from = control.get('prefix_from').value;
    let prefix_to = control.get("prefix_to").value;

    if(prefix_from > prefix_to) 
      return { prefFromTo: true }
    
    return null;    
  }  
}
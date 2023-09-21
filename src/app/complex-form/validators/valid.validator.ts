import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Custom validator function to check if the input value contains 'VALID'.
 * @returns A validator function.
 */
export function validValidator(): ValidatorFn {
  // Return a function that takes an AbstractControl and returns either null or ValidationErrors
  return (ctrl: AbstractControl): null | ValidationErrors => {
    // Check if the input value includes the string 'VALID'
    if (ctrl.value.includes('VALID')) {
      // If the value contains 'VALID', return null (no validation error)
      return null;
    } else {
      // If the value does not contain 'VALID', return a ValidationErrors object
      return {
        validValidator: ctrl.value  // Include the value in the error object for reference
      };
    }
  };
}

import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Custom validator function to compare two form control values for equality.
 *
 * @param main The name of the main control.
 * @param confirm The name of the confirm control.
 * @returns A validator function.
 */
export function confirmEqualValidator(main: string, confirm: string): ValidatorFn {
  // Return a function that takes an AbstractControl and returns either null or ValidationErrors
  return (ctrl: AbstractControl): null | ValidationErrors => {
    // Check if the main and confirm controls exist in the form group
    if (!ctrl.get(main) || !ctrl.get(confirm)) {
      return {
        confirmEqual: 'Invalid control names'
      };
    }

    // Get the values of the main and confirm controls
    const mainValue = ctrl.get(main)!.value;
    const confirmValue = ctrl.get(confirm)!.value;

    // Compare the values of the main and confirm controls
    return mainValue === confirmValue
      ? null  // no validation error
      : {
        confirmEqual: {
          main: mainValue,
          confirm: confirmValue
        }
      }; // return a ValidationErrors object with details
  };
}

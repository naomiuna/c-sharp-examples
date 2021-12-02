import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';

// tslint:disable-next-line:only-arrow-functions
export function MultiCheckbox(howManyMin?: number, message?: string | (() => string), elementName?: string): ValidatorFn {
  const defaultMessage = howManyMin ? `At least ${howManyMin} selections are required` : 'At least one selection is required';
  return (formGroup: FormGroup): { [key: string]: string } | null => {
    let selectedCount = 0;
    for (const key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        const control: FormControl = formGroup.controls[key] as FormControl;
        if (control.value && control.value[elementName || 'selected']) {
          selectedCount++;
          if (selectedCount >= (howManyMin || 1)) {
            return null;
          }
        }
      }
    }

    return {multiCheckbox:
      (typeof message === 'function'
      ? message ()
      : message || defaultMessage)};
  };

}

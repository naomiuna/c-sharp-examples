import { ValidatorFn, AbstractControl } from '@angular/forms';

// tslint:disable-next-line:only-arrow-functions
export function RequiredSingleSelect(message?: string | (() => string)): ValidatorFn {
  const defaultMessage = 'A selection is required';
  return (control: AbstractControl): { [key: string]: string } | null => {
      return (!control.value || control.value === '')
      ? { requiredSingleSelect:
        (typeof message === 'function'
        ? message ()
        : message || defaultMessage)} : null;
  };
}

import { ValidatorFn, AbstractControl } from '@angular/forms';

// tslint:disable-next-line:only-arrow-functions
export function Required(message?: string | (() => string)): ValidatorFn {
  const defaultMessage = 'This field is required';
  return (control: AbstractControl): { [key: string]: string } | null => {
      return (!control.value || control.value === '')
      ? { required: (typeof message === 'function' ? message ()
      : message || defaultMessage)} : null;
  };
}

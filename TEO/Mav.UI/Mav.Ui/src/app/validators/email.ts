import { AbstractControl, ValidatorFn } from '@angular/forms';

// tslint:disable-next-line:only-arrow-functions
export function Email(message?: string | (() => string)): ValidatorFn {
  const defaultMessage = 'Please enter a valid email address';
  return (control: AbstractControl): { [key: string]: string } | null => {
      const pattern = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
      return (!control.value || control.value === '')
        ? null
        : pattern.test(control.value) ? null : {
            email: (typeof message === 'function' ? message () : message || defaultMessage)
          };
  };
}

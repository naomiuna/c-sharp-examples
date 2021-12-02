import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

// tslint:disable-next-line:only-arrow-functions
export function MaxLength(maxLength: number, message?: string | (() => string)): ValidatorFn {
  const defaultMessage = `This field must be ${maxLength} or fewer characters`;
  return (control: AbstractControl): { [key: string]: string } | null => {
      return (control.value && control.value.length > maxLength)
      ? { maxLength: (typeof message === 'function' ? message ()
      : message || defaultMessage)} : null;
  };
}

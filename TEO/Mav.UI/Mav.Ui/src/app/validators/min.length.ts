import { ValidatorFn, AbstractControl } from '@angular/forms';

// tslint:disable-next-line:only-arrow-functions
export function MinLength(minLength: number, message?: string | (() => string)): ValidatorFn {
  const defaultMessage = `This field must be ${minLength} or more characters`;
  return (control: AbstractControl): { [key: string]: string } | null => {
      return (control.value && control.value.length < minLength)
      ? { minLength: (typeof message === 'function' ? message ()
      : message || defaultMessage)} : null;
  };
}

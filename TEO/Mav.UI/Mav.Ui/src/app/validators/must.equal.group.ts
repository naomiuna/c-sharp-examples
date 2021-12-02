import { ValidatorFn, FormGroup } from '@angular/forms';

// tslint:disable-next-line:only-arrow-functions
export function MustEqualGroup(
  fieldName1: string,
  fieldName2: string,
  message?: string | (() => string)): ValidatorFn {
  const defaultMessage = `This field must equal the value in field '${fieldName1}'`;
  return (formGroup: FormGroup): { [key: string]: string } | null => {
    const eMessage = (typeof message === 'function' ? message ()
      : message || defaultMessage);
    const val1 = formGroup.get(fieldName1) ? formGroup.get(fieldName1).value : '';
    const val2 = formGroup.get(fieldName2) ? formGroup.get(fieldName2).value : '';
      return val1 !== '' && val2 !== '' && val1 !== val2
      ? { mustEqual: eMessage.replace('{0}', fieldName1).replace('{1}', fieldName2)} : null;
  };
}

import { ValidatorFn, AbstractControl } from '@angular/forms';
import { dateToString } from './date-functions';

// tslint:disable-next-line:only-arrow-functions
export function LaterThan(
  inDate: Date | (() => Date), allowEqualTo: boolean = false, message?: string | (() => string), messageDateFormat?: string): ValidatorFn {
  if (!inDate) {
    throw new Error('LaterThan: missing parameter');
  }
  return (control: AbstractControl): { [key: string]: string } | null => {
    if (control.value) {
      const thisDate = (typeof inDate === 'function') ? inDate() : inDate;
      thisDate.setHours(0, 0, 0, 0); // Remove time component
      const inDateStr = dateToString(thisDate, messageDateFormat || 'dd/mm/yyyy');
      // Handle browsers that cannot extend the value object
      const controlDate = !control.value.getFullYear ?
        new Date(
          parseInt(control.value.substr(6, 4), 10),
          parseInt(control.value.substr(3, 2), 10) - 1,
          parseInt(control.value.substr(0, 2), 10)) :
        new Date(control.value.getFullYear(), control.value.getMonth(), control.value.getDate());
      const defaultMessage = 'This date must be later than {0}';
      const eMessage = ((typeof message === 'function') ? message() : (message || defaultMessage))
        .replace('{0}', inDateStr);
      if (allowEqualTo) {
        return (controlDate < thisDate) ? { laterThan: eMessage} : null;
      } else {
        return (controlDate <= thisDate) ? { laterThan: eMessage} : null;
      }
    } else {
      return null;
    }
  };
}

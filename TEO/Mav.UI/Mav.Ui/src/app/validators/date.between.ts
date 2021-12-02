import { ValidatorFn, AbstractControl } from '@angular/forms';
import { dateToString } from './date-functions';

// tslint:disable-next-line:only-arrow-functions
export function DateBetween(
  minDate: Date | (() => Date),
  maxDate: Date | (() => Date),
  allowEqualTo: boolean = false,
  message?: string | (() => string),
  messageDateFormat?: string
): ValidatorFn {
  if (!minDate || !maxDate) {
    throw new Error('DateBetween: missing parameter');
  }
  return (control: AbstractControl): { [key: string]: string } | null => {
    if (control.value) {
      const thisMinDate = (typeof minDate === 'function') ? minDate() : minDate;
      const thisMaxDate = (typeof maxDate === 'function') ? maxDate() : maxDate;
      thisMinDate.setHours(0, 0, 0, 0); // Remove time component
      thisMaxDate.setHours(0, 0, 0, 0); // Remove time component
      const minDateStr = dateToString(thisMinDate, messageDateFormat || 'dd/mm/yyyy');
      const maxDateStr = dateToString(thisMaxDate, messageDateFormat || 'dd/mm/yyyy');
      // Handle browsers that cannot extend the value object
      const controlDate = !control.value.getFullYear ?
        new Date(
          parseInt(control.value.substr(6, 4), 10),
          parseInt(control.value.substr(3, 2), 10) - 1,
          parseInt(control.value.substr(0, 2), 10)) :
        new Date(control.value.getFullYear(), control.value.getMonth(), control.value.getDate());
      const defaultMessage = 'This date must be between {0} and {1}';
      const eMessage = ((typeof message === 'function') ? message() : (message || defaultMessage))
      .replace('{0}', minDateStr).replace('{1}', maxDateStr);
      if (!allowEqualTo) {
        return (controlDate <= thisMinDate || controlDate >= thisMaxDate) ? { dateBetween: eMessage} : null;
      } else {
        return (controlDate < thisMinDate || controlDate > thisMaxDate) ? { dateBetween: eMessage} : null;
      }
    } else {
      return null;
    }
  };
}

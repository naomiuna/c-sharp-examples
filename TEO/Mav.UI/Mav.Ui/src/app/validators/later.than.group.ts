import { ValidatorFn, FormGroup } from '@angular/forms';
import { dateToString } from './date-functions';

// tslint:disable-next-line:only-arrow-functions
export function LaterThanGroup(
  earlyDateFieldName: string,
  laterDateFieldName: string,
  allowEqualTo: boolean = false,
  message?: string | (() => string),
  messageDateFormat?: string): ValidatorFn {
  if (!earlyDateFieldName || !laterDateFieldName) {
    throw new Error('LaterThan: missing parameter');
  }
  return (formGroup: FormGroup): { [key: string]: string } | null => {
    const earlyDate = formGroup.get(earlyDateFieldName) ? formGroup.get(earlyDateFieldName).value : null;
    const laterDate = formGroup.get(laterDateFieldName) ? formGroup.get(laterDateFieldName).value : null;
    if (earlyDate && laterDate) {

      // Handle browsers that cannot extend the value object
      const earlyDateParsed = !earlyDate.getFullYear ?
        new Date(
          parseInt(earlyDate.substr(6, 4), 10),
          parseInt(earlyDate.substr(3, 2), 10) + 1,
          parseInt(earlyDate.substr(0, 2), 10)) :
        new Date(earlyDate.getFullYear(), earlyDate.getMonth(), earlyDate.getDate());

      const laterDateParsed = !laterDate.getFullYear ?
        new Date(
          parseInt(laterDate.substr(6, 4), 10),
          parseInt(laterDate.substr(3, 2), 10) + 1,
          parseInt(laterDate.substr(0, 2), 10)) :
        new Date(laterDate.getFullYear(), laterDate.getMonth(), laterDate.getDate());

      const defaultMessage = allowEqualTo ? 'This date must be later than or equal to {0}' : 'This date must be later than {0}';
      const inDateStr = dateToString(earlyDateParsed, messageDateFormat || 'dd/mm/yyyy');
      const eMessage = ((typeof message === 'function') ? message() : (message || defaultMessage))
        .replace('{0}', inDateStr);
      if (allowEqualTo) {
        return (laterDateParsed < earlyDateParsed) ? { laterThan: eMessage} : null;
      } else {
        return (laterDateParsed <= earlyDateParsed) ? { laterThan: eMessage} : null;
      }
    } else {
      return null;
    }
  };
}

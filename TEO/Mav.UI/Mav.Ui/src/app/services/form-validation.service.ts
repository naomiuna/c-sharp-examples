import { Injectable } from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { FormGroup, AbstractControl } from '@angular/forms';

@Injectable()
export class FormValidationService {

  private fieldErrors: {};

  private formErrors: string[] = [];

  private formFields: string[];

  constructor() {}

  // Set up fields to have error validation messages handled
  // This must handle recursion so that nested FormGroups can be catered for
  public setFormFields(form: FormGroup) {
    this.formFields = [];
    this.fieldErrors = new Array();
    this.setFormFieldsRecursive(form);
  }

  // Get all values of the formGroup, loop over them then mark each field as touched
  public markFormGroupTouched(formGroup: FormGroup) {
    formGroup.markAsTouched();
    if (formGroup.controls) {
      Object.keys(formGroup.controls).map(key => {
        const control = formGroup.controls[key] as FormGroup;
        if (control) {
          this.markFormGroupTouched(control);
        }
      });
    }
  }

  // Get all values of the formGroup, loop over them then mark each field as untouched
  public markFormGroupUntouched(formGroup: FormGroup) {
    formGroup.markAsUntouched();
    if (formGroup.controls) {
      Object.keys(formGroup.controls).map(key => {
        const control = formGroup.controls[key] as FormGroup;
        if (control) {
          this.markFormGroupUntouched(control);
        }
      });
    }
  }

  public getFullyQualifiedField(form: FormGroup, fullyQualifiedKey: string): AbstractControl {
    const keyStructure = fullyQualifiedKey.split('.');
    let elem: AbstractControl = form;
    for (const key of keyStructure) {
      if (elem) {
        elem = elem.get(key);
      }
    }
    return elem;
  }
  // Validate form instance
  // check_dirty true will only emit errors if the field is touched
  // check_dirty false will check all fields independent of
  // being touched or not. Use this as the last check before submitting
  public validateForm(formToValidate: FormGroup, checkDirty?: boolean, gotoError?: boolean) {
    const form = formToValidate;
    for (const field in this.fieldErrors) {
      if (field) {
        this.fieldErrors[field] = [] as string[];
        const control = this.getFullyQualifiedField(form, field);

        if (control && !control.valid) {
          if (!checkDirty || (control.dirty || control.touched)) {
            for (const key in control.errors) {
              if (key) {
                this.fieldErrors[field].push(control.errors[key]);
              }
            }
          }
        }
      }
    }
    if (gotoError) {
      this.gotoError();
    }
  }

  public getErrors(fieldName: string, includeGroupErrors = false) {
    let errors = (this.fieldErrors[fieldName] || []);
    if (includeGroupErrors) {
      errors = errors.concat(this.fieldErrors[this.getGroupName(fieldName)] || []);
    }
    return errors;
  }

  public gotoError() {
    for (const fieldName of Object.keys(this.fieldErrors)) {
      if (this.isFieldError(fieldName)) {
        setTimeout(() => {
          this.focusToElement(fieldName);
        }, 100);
        break;
      }
    }
  }

  public focusToElement(fieldName: string) {
    // **** DO NOT USE renderer.selectRootElement() as it removes child elements from the DOM *****
    const elem: Element = document.querySelector('#' + fieldName);
    if (elem) {
        const tagName = (elem as HTMLElement).tagName;
        if (tagName === 'INPUT') {
          (elem as HTMLElement).focus();
        }
    }
  }

  public isFieldError(fieldName: string, includeGroupErrors = false) {
    const atLeastOneFieldError = this.fieldErrors[fieldName] && this.fieldErrors[fieldName].length > 0;
    if (atLeastOneFieldError) {
      return true;
    }
    if (includeGroupErrors) {
      fieldName = this.getGroupName(fieldName);
    const atLeastOneGroupError = this.fieldErrors[fieldName] && this.fieldErrors[fieldName].length > 0;
      if (atLeastOneGroupError) {
        return true;
      }
    }
    return false;
  }

  public isAnyError() {
    if (this.formErrors && this.formErrors.length > 0) {
      return true;
    }
    for (const key of Object.keys(this.fieldErrors)) {
      if (this.fieldErrors[key] && this.fieldErrors[key].length > 0) {
        return true;
      }
    }
    return false;
  }

  public getErrorClass(fieldName: string, includeGroupErrors = false): string {
    return this.isFieldError(fieldName, includeGroupErrors) ? 'error' : '';
  }

  public detectChangesInForm(form: FormGroup, debounceMilliseconds: number = 700) {
    form.valueChanges
      .debounceTime(debounceMilliseconds)
      .distinctUntilChanged()
      .subscribe(() => {
      this.validateForm(form, true);
    });
  }

  public clearFormLevelErrors() {
    this.formErrors = [];
  }

  public addFormLevelError(message: string) {
    this.formErrors.push(message);
  }

  public getFormLevelErrors() {
    return this.formErrors;
  }

  // Recursive-capable method to initialise the error structures for each form element
  private setFormFieldsRecursive(form: FormGroup, parentKey = '') {
    Object.keys(form.controls).map(key => {
      const fullKey = parentKey !== '' ? parentKey + '.' + key : key;
      this.formFields.push(fullKey);
      this.fieldErrors[fullKey] = [];
      if ((form.controls[key] as FormGroup).controls) {
        this.setFormFieldsRecursive(form.controls[key] as FormGroup, key);
      }
    });
  }

  private getGroupName(fieldName: string) {
    return fieldName.substring(0, fieldName.indexOf('.'));
  }
}

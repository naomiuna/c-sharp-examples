import { Component, OnInit, Input } from '@angular/core';
import { first } from 'lodash';
import { FormValidationService } from '../services/form-validation.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.css']
})
export class ValidationMessageComponent implements OnInit {

  @Input()
  public fieldName: string;

  @Input()
  public includeGroupErrors: boolean;

  constructor(private readonly validationService: FormValidationService) { }

  public ngOnInit() {
  }

  public get error() {
    return first(this.errors || []) || '';
  }

  public get errors() {
    return this.validationService.getErrors(this.fieldName, this.includeGroupErrors);
  }

  public hasErrors() {
    return !!this.errors.length;
  }

}

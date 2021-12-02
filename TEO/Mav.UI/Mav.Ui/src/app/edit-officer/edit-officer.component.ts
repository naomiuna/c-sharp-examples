import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';
import { GenericEventArgs } from '../models/admin/generic-event-args';
import { EnumEventType } from '../models/admin/generic-event-type';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { InvigilatorViewModel } from '../models/invigilator.view.model';
import { AppComponentBase } from '../app.component.base';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { FormValidationService } from '../services/form-validation.service';
import { EnumStatusCode } from '../models/generic.status';
import { Required } from '../validators/required';
import { Email } from '../validators/email';

@Component({
  selector: 'app-edit-officer',
  templateUrl: './edit-officer.component.html',
  styleUrls: ['./edit-officer.component.css']
})
export class EditOfficerComponent extends AppComponentBase implements OnInit {

  @Input() id: string; // User ID

  @Output() officerActionRequest: EventEmitter<GenericEventArgs>;

  private eventArgs: GenericEventArgs;

  public userDetails: InvigilatorViewModel = new InvigilatorViewModel();

  public editOfficerForm: FormGroup;

  public get firstName(): AbstractControl { return this.editOfficerForm.get('FirstName'); }
  public get surname(): AbstractControl { return this.editOfficerForm.get('Surname'); }
  public get email(): AbstractControl { return this.editOfficerForm.get('Email'); }

  public isEnabled: boolean;

  constructor(
    public routeConfig: Router,
    private userService: UserServiceService,
    private readonly fb: FormBuilder,
    public validationService: FormValidationService
  ) {
    super(routeConfig);

    this.officerActionRequest = new EventEmitter<GenericEventArgs>();
  }

  ngOnInit() {
    super.ngOnInit();
    this.buildForm();
    this.actionPending = true;
    this.userService.getExamInvigilatorDetails(this.id)
    .subscribe(
      r1 => {
        console.log(r1);
        this.userDetails = r1;
        this.actionPending = false;

        this.editOfficerForm.controls['FirstName'].setValue(this.userDetails.firstName);
        this.editOfficerForm.controls['Surname'].setValue(this.userDetails.surname);
        this.editOfficerForm.controls['Email'].setValue(this.userDetails.email);
        this.isEnabled = this.userDetails.enabled;
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

  public submitForm() {
    this.validationService.markFormGroupTouched(this.editOfficerForm);
    this.saveChanges(false);
  }

  public saveChanges(addMore: boolean): void {
    console.log(`Edit Officer: save changes called ${addMore}`);
    this.resetForm();

    if (!this.editOfficerForm.valid) {
      this.validationService.validateForm(this.editOfficerForm, false, true);
      return;
    }

    this.userDetails.firstName = this.firstName.value;
    this.userDetails.surname = this.surname.value;
    this.userDetails.email = this.email.value;
    this.userDetails.enabled = this.isEnabled;

    this.actionPending = true;
    this.userService.updateInvigilator(this.userDetails)
    .subscribe(
      r1 => {
        console.log(r1);
        this.actionPending = false;
        if (r1.status === EnumStatusCode.Ok) {
          this.updateOk = true;
          this.officerUpdateComplete();
        } else {
          this.error = r1.message;
        }
      },
      e1 => {
        console.log(e1);
        this.actionPending = false;
        this.error = `An unexpected error has occurred`;
      }
    );

  }

  officerUpdateComplete(): void {
    this.eventArgs = new GenericEventArgs();
    this.eventArgs.stringID = this.id;
    this.eventArgs.eventType = EnumEventType.OfficerUpdated;
    this.officerActionRequest.emit(this.eventArgs);
  }

  officerUpdateCancel() {
    this.eventArgs = new GenericEventArgs();
    this.eventArgs.stringID = this.id;
    this.eventArgs.eventType = EnumEventType.OfficerUpdateCancel;
    this.officerActionRequest.emit(this.eventArgs);
  }

  public changeEnabled(event: MatSlideToggleChange): void {
    this.isEnabled = event.checked;
  }

  public cancelForm() {
    this.officerUpdateCancel();
  }

  public performDelete(): void {
    if (this.id !== null) {
      this.userService.deleteUser(this.id)
      .subscribe(
        r1 => {
          console.log(r1);
          if (r1.status === EnumStatusCode.Ok) {
            this.officerUpdateCancel();
          } else {
            this.error = r1.message;
          }
        },
        (e1: Error) => {
          this.onApiError(e1.message);
        }
      );
    }
  }

  private buildForm(): void {
    this.editOfficerForm = this.fb.group({
      FirstName: ['', Required('Please enter a first name')],
      Surname: ['', Required('Please enter a surname')],
      Email: ['', [Required('Please enter an email address'), Email('Please enter a valid email address')]]
    });

    this.validationService.setFormFields(this.editOfficerForm);

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.validationService.detectChangesInForm(this.editOfficerForm);
  }

}

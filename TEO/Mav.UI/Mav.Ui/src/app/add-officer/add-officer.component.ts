import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GenericEventArgs } from '../models/admin/generic-event-args';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { AddInvigilatorViewModel } from '../models/add.invigilator.view.model';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { FormValidationService } from '../services/form-validation.service';
import { EnumEventType } from '../models/admin/generic-event-type';
import { Required } from '../validators/required';
import { EnumStatusCode } from '../models/generic.status';
import { environment } from '../../environments/environment';
import { Email } from '../validators/email';
import { AppComponentBase } from '../app.component.base';

@Component({
  selector: 'app-add-officer',
  templateUrl: './add-officer.component.html',
  styleUrls: ['./add-officer.component.css']
})
export class AddOfficerComponent extends AppComponentBase implements OnInit {

  @Input() id: number; // Centre ID

  @Output() officerActionRequest: EventEmitter<GenericEventArgs>;

  private eventArgs: GenericEventArgs;

  public userDetails: AddInvigilatorViewModel = new AddInvigilatorViewModel();

  public addOfficerForm: FormGroup;

  public get firstName(): AbstractControl { return this.addOfficerForm.get('FirstName'); }
  public get surname(): AbstractControl { return this.addOfficerForm.get('Surname'); }
  public get email(): AbstractControl { return this.addOfficerForm.get('Email'); }

  constructor(
    public routeConfig: Router,
    private readonly fb: FormBuilder,
    public validationService: FormValidationService,
    public userService: UserServiceService
  ) {
    super(routeConfig);

    this.officerActionRequest = new EventEmitter<GenericEventArgs>();
  }

  ngOnInit() {
    super.ngOnInit();
    this.buildForm();
  }

  officerAddComplete(newID: string): void {
    this.eventArgs = new GenericEventArgs();
    this.eventArgs.stringID = newID;
    this.eventArgs.eventType = EnumEventType.OfficerAdded;
    this.officerActionRequest.emit(this.eventArgs);
  }

  public cancelForm() {
    this.eventArgs = new GenericEventArgs();
    this.eventArgs.keyID = this.id;
    this.eventArgs.eventType = EnumEventType.OfficerAddCancel;
    this.officerActionRequest.emit(this.eventArgs);
  }

  public submitForm() {
    this.validationService.markFormGroupTouched(this.addOfficerForm);
    this.saveChanges(false);
  }

  public saveChanges(addMore: boolean): void {
    console.log(`Add Officer: save changes called ${addMore}`);
    this.resetForm();

    if (!this.addOfficerForm.valid) {
      this.validationService.validateForm(this.addOfficerForm, false, true);
      return;
    }

    this.userDetails.returnUrl = environment.clientId;
    this.userDetails.firstName = this.firstName.value;
    this.userDetails.surname = this.surname.value;
    this.userDetails.email = this.email.value;
    this.userDetails.confirmEmail = this.email.value;
    this.userDetails.centreID = this.id;

    this.actionPending = true;
    this.userService.createExamOfficer(this.userDetails)
    .subscribe(
      r1 => {
        console.log(r1);
        this.actionPending = false;
        if (r1.status === EnumStatusCode.Ok) {
          this.updateOk = true;
          this.officerAddComplete(r1.keyID);
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

  private buildForm(): void {
    this.addOfficerForm = this.fb.group({
      FirstName: ['', Required('Please enter your first name')],
      Surname: ['', Required('Please enter your surname')],
      Email: ['', [Required('Please enter your email'), Email('Please enter a valid email address')]]
    });

    this.validationService.setFormFields(this.addOfficerForm);

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.validationService.detectChangesInForm(this.addOfficerForm);
  }

}

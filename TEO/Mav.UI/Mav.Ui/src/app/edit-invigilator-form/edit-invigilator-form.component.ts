import { Component, OnInit, Input } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router } from '@angular/router';
import { InvigilatorViewModel } from '../models/invigilator.view.model';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { FormValidationService } from '../services/form-validation.service';
import { EnumStatusCode } from '../models/generic.status';
import { Required } from '../validators/required';
import { Email } from '../validators/email';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-edit-invigilator-form',
  templateUrl: './edit-invigilator-form.component.html',
  styleUrls: ['./edit-invigilator-form.component.css']
})
export class EditInvigilatorFormComponent extends AppComponentBase implements OnInit {

  @Input() id: string;

  public userDetails: InvigilatorViewModel = new InvigilatorViewModel();

  public editInvigilatorForm: FormGroup;

  public get firstName(): AbstractControl { return this.editInvigilatorForm.get('FirstName'); }
  public get surname(): AbstractControl { return this.editInvigilatorForm.get('Surname'); }
  public get email(): AbstractControl { return this.editInvigilatorForm.get('Email'); }

  constructor(
    public routeConfig: Router,
    private userService: UserServiceService,
    private readonly fb: FormBuilder,
    public validationService: FormValidationService
  ) {
    super(routeConfig);
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

        this.editInvigilatorForm.controls['FirstName'].setValue(this.userDetails.firstName);
        this.editInvigilatorForm.controls['Surname'].setValue(this.userDetails.surname);
        this.editInvigilatorForm.controls['Email'].setValue(this.userDetails.email);
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

  public submitForm() {
    this.validationService.markFormGroupTouched(this.editInvigilatorForm);
    this.saveChanges(false);
  }

  public saveChanges(addMore: boolean): void {
    console.log(`Add Invigilator: save changes called ${addMore}`);
    this.resetForm();

    if (!this.editInvigilatorForm.valid) {
      this.validationService.validateForm(this.editInvigilatorForm, false, true);
      return;
    }

    this.userDetails.firstName = this.firstName.value;
    this.userDetails.surname = this.surname.value;
    this.userDetails.email = this.email.value;

    this.actionPending = true;
    this.userService.updateInvigilator(this.userDetails)
    .subscribe(
      r1 => {
        console.log(r1);
        this.actionPending = false;
        if (r1.status === EnumStatusCode.Ok) {
          this.updateOk = true;
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

  public cancelForm() {
    this.routeConfig.navigate([`invigilator-details/${this.id}`]);
  }

  private buildForm(): void {
    this.editInvigilatorForm = this.fb.group({
      FirstName: ['', Required('Please enter a first name')],
      Surname: ['', Required('Please enter a surname')],
      Email: ['', [Required('Please enter an email address'), Email('Please enter a valid email address')]]
    });

    this.validationService.setFormFields(this.editInvigilatorForm);

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.validationService.detectChangesInForm(this.editInvigilatorForm);
  }

}

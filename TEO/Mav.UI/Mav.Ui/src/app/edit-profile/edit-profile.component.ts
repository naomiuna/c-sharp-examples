import { Component, OnInit } from '@angular/core';
import { ExamUserViewModel } from '../models/user.exam.view.model';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponentBase } from '../app.component.base';
import { CentreViewModel } from '../models/centre.view.model';
import { EnumStatusCode } from '../models/generic.status';
import { FormValidationService } from '../services/form-validation.service';
import { Required } from '../validators/required';
import { Email } from '../validators/email';
import { UserServiceService } from '../services/user-service.service';
import { CentreServiceService } from '../services/centre-service.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent extends AppComponentBase implements OnInit {

  public profileDetails: ExamUserViewModel = new ExamUserViewModel();
  public centreDetails: CentreViewModel = new CentreViewModel();

  public changeProfileForm: FormGroup;

  public get firstName(): AbstractControl { return this.changeProfileForm.get('FirstName'); }
  public get surname(): AbstractControl { return this.changeProfileForm.get('Surname'); }
  public get email(): AbstractControl { return this.changeProfileForm.get('Email'); }
  public get centreName(): AbstractControl { return this.changeProfileForm.get('CentreName'); }
  public get centreNumber(): AbstractControl { return this.changeProfileForm.get('CentreNumber'); }

  constructor(
    public routeConfig: Router,
    private readonly fb: FormBuilder,
    private userService: UserServiceService,
    private centreService: CentreServiceService,
    public validationService: FormValidationService
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.buildForm();
    this.actionPending = true;
    this.userService.getCurrentUser<ExamUserViewModel>()
    .subscribe(
      r1 => {
        console.log(r1);
        this.profileDetails = r1;
        this.changeProfileForm.controls['FirstName'].setValue(this.profileDetails.firstName);
        this.changeProfileForm.controls['Surname'].setValue(this.profileDetails.surname);
        this.changeProfileForm.controls['Email'].setValue(this.profileDetails.email);

        if (this.profileDetails.canEditCentre) {
          this.centreService.getCentreByUserId(this.profileDetails.id)
          .subscribe(
            r2 => {
              console.log(r2);
              this.centreDetails = r2;
              this.changeProfileForm.controls['CentreName'].setValue(this.centreDetails.name);
              this.changeProfileForm.controls['CentreName'].setValidators([Required('Please enter your first name')]);
              this.changeProfileForm.controls['CentreNumber'].setValue(this.centreDetails.number);
              this.actionPending = false;
            },
            (e2: Error) => {
              this.onApiError(e2.message);
            }
          );
        } {
          this.actionPending = false;
        }
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

  public saveChanges(): void {
    console.log(`Edit profile: save changes called.`);
    this.validationService.markFormGroupTouched(this.changeProfileForm);
    this.resetForm();

    if (!this.changeProfileForm.valid) {
      this.validationService.validateForm(this.changeProfileForm, false, true);
      return;
    }

    this.profileDetails.firstName = this.firstName.value;
    this.profileDetails.surname = this.surname.value;
    this.profileDetails.email = this.email.value;

    if (this.profileDetails.canEditCentre) {
      this.centreDetails.name = this.centreName.value;
      this.centreDetails.number = this.centreNumber.value;
    }

    this.actionPending = true;
    this.userService.updateProfile(this.profileDetails)
    .subscribe(
      r1 => {
        console.log(r1);
        if (r1.status === EnumStatusCode.Ok) {
          if (this.profileDetails.canEditCentre) {
            this.centreService.updateCentre(this.centreDetails)
            .subscribe(
              r2 => {
                console.log(r2);
                if (r2.status === EnumStatusCode.Ok) {
                  this.updateOk = true;
                  this.actionPending = false;
                } else {
                  this.actionPending = false;
                  this.error = r2.message;
                }
              },
              e2 => {
                console.log(e2);
                this.actionPending = false;
                this.error = `An unexpected error has occurred`;
              }
            );
          } else {
            this.updateOk = true;
            this.actionPending = false;
          }
        } else {
          this.actionPending = false;
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
    this.changeProfileForm = this.fb.group({
      FirstName: ['', Required('Please enter your first name')],
      Surname: ['', Required('Please enter your surname')],
      Email: ['', [Required('Please enter your email'), Email('Please enter a valid email address')]],
      CentreName: [''],
      CentreNumber: ['']
    });

    this.validationService.setFormFields(this.changeProfileForm);

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.validationService.detectChangesInForm(this.changeProfileForm);
  }

}

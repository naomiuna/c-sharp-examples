import { Component, OnInit, Input } from '@angular/core';
import { UserViewModel } from '../models/user.view.model';
import { AbstractControl, FormGroup, FormBuilder } from '@angular/forms';
import { AppComponentBase } from '../app.component.base';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { FormValidationService } from '../services/form-validation.service';
import { Required } from '../validators/required';
import { Email } from '../validators/email';
import { EnumStatusCode } from '../models/generic.status';

@Component({
  selector: 'app-users-edit-form',
  templateUrl: './users-edit-form.component.html',
  styleUrls: ['./users-edit-form.component.css']
})
export class UsersEditFormComponent extends AppComponentBase implements OnInit {

  @Input() id: string;

  public userDetails: UserViewModel = new UserViewModel();

  public editUserForm: FormGroup;
  public roleID: number;

  public get firstName(): AbstractControl { return this.editUserForm.get('FirstName'); }
  public get surname(): AbstractControl { return this.editUserForm.get('Surname'); }
  public get email(): AbstractControl { return this.editUserForm.get('Email'); }
  public get role(): AbstractControl { return this.editUserForm.get('Role'); }

  constructor(
    public routeConfig: Router,
    private userService: UserServiceService,
    private readonly fb: FormBuilder,
    public validationService: FormValidationService
  ) {
    super(routeConfig);
    this.roleID = 1;
  }

  ngOnInit() {
    super.ngOnInit();
    this.buildForm();
    this.actionPending = true;
    this.userService.getUserById<UserViewModel>(this.id)
    .subscribe(
      r1 => {
        console.log(r1);
        this.userDetails = r1;
        this.actionPending = false;

        this.editUserForm.controls['FirstName'].setValue(this.userDetails.firstName);
        this.editUserForm.controls['Surname'].setValue(this.userDetails.surname);
        this.editUserForm.controls['Email'].setValue(this.userDetails.email);

        if (this.userDetails.role === 'Administrator') {
          this.roleID = 1;
        } else  if (this.userDetails.role === 'Editor') {
          this.roleID = 2;
        }
        this.editUserForm.controls['Role'].setValue(this.roleID);
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

  public submitForm() {
    this.validationService.markFormGroupTouched(this.editUserForm);
    this.saveChanges(false);
  }

  public saveChanges(addMore: boolean): void {
    console.log(`Edit User: save changes called ${addMore}`);
    this.resetForm();

    if (!this.editUserForm.valid) {
      this.validationService.validateForm(this.editUserForm, false, true);
      return;
    }

    this.userDetails.firstName = this.firstName.value;
    this.userDetails.surname = this.surname.value;
    this.userDetails.email = this.email.value;

    if (this.role.value === 1) {
      this.userDetails.role = 'Administrator';
    } else  if (this.role.value === 2) {
      this.userDetails.role = 'Editor';
    }

    this.actionPending = true;
    this.userService.updateUser(this.userDetails)
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
    this.routeConfig.navigate([`admin/users`]);
  }

  public performDelete(): void {
    if (this.id !== null) {
      this.userService.deleteUser(this.id)
      .subscribe(
        r1 => {
          console.log(r1);
          if (r1.status === EnumStatusCode.Ok) {
            this.routeConfig.navigate([`admin/users`]);
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
    this.editUserForm = this.fb.group({
      FirstName: ['', Required('Please enter a first name')],
      Surname: ['', Required('Please enter a surname')],
      Email: ['', [Required('Please enter an email address'), Email('Please enter a valid email address')]],
      Role: ['']
    });

    this.validationService.setFormFields(this.editUserForm);

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.validationService.detectChangesInForm(this.editUserForm);
  }

}

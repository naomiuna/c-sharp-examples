import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder } from '@angular/forms';
import { AppComponentBase } from '../app.component.base';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { FormValidationService } from '../services/form-validation.service';
import { Required } from '../validators/required';
import { Email } from '../validators/email';
import { EnumStatusCode } from '../models/generic.status';
import { AddUserViewModel } from '../models/add.user.view.model';

@Component({
  selector: 'app-users-create-form',
  templateUrl: './users-create-form.component.html',
  styleUrls: ['./users-create-form.component.css']
})
export class UsersCreateFormComponent extends AppComponentBase implements OnInit {

  @Input() id: string;

  public userDetails: AddUserViewModel = new AddUserViewModel();

  public createUserForm: FormGroup;
  public roleID: number;

  public get firstName(): AbstractControl { return this.createUserForm.get('FirstName'); }
  public get surname(): AbstractControl { return this.createUserForm.get('Surname'); }
  public get email(): AbstractControl { return this.createUserForm.get('Email'); }
  public get role(): AbstractControl { return this.createUserForm.get('Role'); }

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
    this.roleID = 1;
    this.createUserForm.controls['Role'].setValue(this.roleID);
  }

  public submitForm() {
    this.validationService.markFormGroupTouched(this.createUserForm);
    this.saveChanges(false);
  }

  public addAnother(): void {
    this.refreshScreenSkipLocation('/admin/users-create');
  }

  public saveChanges(addMore: boolean): void {
    console.log(`Create User: save changes called ${addMore}`);
    this.resetForm();

    if (!this.createUserForm.valid) {
      this.validationService.validateForm(this.createUserForm, false, true);
      return;
    }

    this.userDetails.firstName = this.firstName.value;
    this.userDetails.surname = this.surname.value;
    this.userDetails.email = this.email.value;
    this.userDetails.confirmEmail = this.email.value;

    if (this.role.value === 1) {
      this.userDetails.role = 'Administrator';
    } else  if (this.role.value === 2) {
      this.userDetails.role = 'Editor';
    }

    this.actionPending = true;
    this.userService.createUser(this.userDetails)
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

  private buildForm(): void {
    this.createUserForm = this.fb.group({
      FirstName: ['', Required('Please enter a first name')],
      Surname: ['', Required('Please enter a surname')],
      Email: ['', [Required('Please enter an email address'), Email('Please enter a valid email address')]],
      Role: ['']
    });

    this.validationService.setFormFields(this.createUserForm);

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.validationService.detectChangesInForm(this.createUserForm);
  }

}

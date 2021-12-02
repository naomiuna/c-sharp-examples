import { Component, OnInit, Input } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { OrganisationTypeService } from '../services/admin/organisation-type.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { FormValidationService } from '../services/form-validation.service';
import { OrganisationTypeViewModel } from '../models/admin/organisation-type.view.model';
import { EnumStatusCode } from '../models/generic.status';
import { Required } from '../validators/required';

@Component({
  selector: 'app-settings-organisationtype-edit-form',
  templateUrl: './settings-organisationtype-edit-form.component.html',
  styleUrls: ['./settings-organisationtype-edit-form.component.css']
})
export class SettingsOrganisationtypeEditFormComponent extends AppComponentBase implements OnInit {

  @Input() id: number;

  public organisationTypeDetails: OrganisationTypeViewModel = new OrganisationTypeViewModel();

  public editOrganisationTypeForm: FormGroup;

  public get name(): AbstractControl { return this.editOrganisationTypeForm.get('Name'); }
  public get centreLimit(): AbstractControl { return this.editOrganisationTypeForm.get('CentreLimit'); }

  constructor(
    public routeConfig: Router,
    private organisationTypeService: OrganisationTypeService,
    private readonly fb: FormBuilder,
    public validationService: FormValidationService
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.buildForm();
    this.actionPending = true;
    this.organisationTypeService.getOrganisationTypeById(this.id)
    .subscribe(
      r1 => {
        console.log(r1);
        this.organisationTypeDetails = r1;
        this.actionPending = false;

        this.editOrganisationTypeForm.controls['Name'].setValue(this.organisationTypeDetails.name);
        this.editOrganisationTypeForm.controls['CentreLimit'].setValue(this.organisationTypeDetails.centreLimit);
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

  public submitForm() {
    this.validationService.markFormGroupTouched(this.editOrganisationTypeForm);
    this.saveChanges(false);
  }

  public saveChanges(addMore: boolean): void {
    console.log(`Edit organisation type: save changes called ${addMore}`);
    this.resetForm();

    if (!this.editOrganisationTypeForm.valid) {
      this.validationService.validateForm(this.editOrganisationTypeForm, false, true);
      return;
    }

    this.organisationTypeDetails.name = this.name.value;
    this.organisationTypeDetails.centreLimit = this.centreLimit.value;

    this.actionPending = true;
    this.organisationTypeService.updateOrganisationType(this.organisationTypeDetails)
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
    this.routeConfig.navigate([`admin/settings`]);
  }

  public addAnother() {
    this.routeConfig.navigate([`admin/settings/organisationtype/create`]);
  }

  public performDelete(): void {
    if (this.id !== null) {
      this.organisationTypeService.deleteOrganisationType(this.id)
      .subscribe(
        r1 => {
          console.log(r1);
          if (r1.status === EnumStatusCode.Ok) {
            this.routeConfig.navigate([`admin/settings`]);
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
    this.editOrganisationTypeForm = this.fb.group({
      Name: ['', Required('Please enter a name for the organisation type')],
      CentreLimit: ['', Required('Please enter a default centre limit for the organisation type')]
    });

    this.validationService.setFormFields(this.editOrganisationTypeForm);

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.validationService.detectChangesInForm(this.editOrganisationTypeForm);
  }

}

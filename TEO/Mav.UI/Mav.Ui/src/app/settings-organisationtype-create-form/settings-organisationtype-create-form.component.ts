import { Component, OnInit } from '@angular/core';
import { OrganisationTypeViewModel } from '../models/admin/organisation-type.view.model';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { OrganisationTypeService } from '../services/admin/organisation-type.service';
import { FormValidationService } from '../services/form-validation.service';
import { AppComponentBase } from '../app.component.base';
import { Required } from '../validators/required';
import { EnumStatusCode } from '../models/generic.status';

@Component({
  selector: 'app-settings-organisationtype-create-form',
  templateUrl: './settings-organisationtype-create-form.component.html',
  styleUrls: ['./settings-organisationtype-create-form.component.css']
})
export class SettingsOrganisationtypeCreateFormComponent extends AppComponentBase implements OnInit {

  public organisationTypeDetails: OrganisationTypeViewModel = new OrganisationTypeViewModel();

  public createOrganisationTypeForm: FormGroup;

  public get name(): AbstractControl { return this.createOrganisationTypeForm.get('Name'); }
  public get centreLimit(): AbstractControl { return this.createOrganisationTypeForm.get('CentreLimit'); }

  constructor(
    public routeConfig: Router,
    private readonly fb: FormBuilder,
    private organisationTypeService: OrganisationTypeService,
    public validationService: FormValidationService
  ) 
  { 
    super(routeConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.buildForm();
  }

  public cancelForm() {
    this.routeConfig.navigate([`admin/settings`]);
  }

  public saveChanges(): void {
    console.log('Create organisation type: save changes called.');
    this.validationService.markFormGroupTouched(this.createOrganisationTypeForm);
    this.resetForm();

    if (!this.createOrganisationTypeForm.valid) {
      this.validationService.validateForm(this.createOrganisationTypeForm, false, true);
      return;
    }

    this.organisationTypeDetails.name = this.name.value;
    this.organisationTypeDetails.centreLimit = this.centreLimit.value;

    this.actionPending = true;
    this.organisationTypeService.createOrganisationType(this.organisationTypeDetails)
    .subscribe(
      r1 => {
        console.log(r1);
        if (r1.status === EnumStatusCode.Ok) {
          this.updateOk = true;
          this.routeConfig.navigate([`admin/settings/organisationtype/edit/${r1.keyID}`]);
        } else {
          this.error = r1.message;
        }
        this.actionPending = false;
      },
      e1 => {
        console.log(e1);
        this.actionPending = false;
        this.error = `An unexpected error has occurred`;
      }
    );
  }

  private buildForm(): void {
    this.createOrganisationTypeForm = this.fb.group({
      Name: ['', Required('Please enter an organisation type name')],
      CentreLimit: ['', Required('Please enter a default centre limit value')]
    });

    this.validationService.setFormFields(this.createOrganisationTypeForm);

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.validationService.detectChangesInForm(this.createOrganisationTypeForm);
  }
}

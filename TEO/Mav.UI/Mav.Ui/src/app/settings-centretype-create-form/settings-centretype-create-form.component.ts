import { Component, OnInit } from '@angular/core';
import { CentreTypeViewModel } from '../models/admin/centre-type.view.model';
import { AbstractControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponentBase } from '../app.component.base';
import { CentreTypeService } from '../services/admin/centre-type.service';
import { FormValidationService } from '../services/form-validation.service';
import { EnumStatusCode } from '../models/generic.status';
import { Required } from '../validators/required';

@Component({
  selector: 'app-settings-centretype-create-form',
  templateUrl: './settings-centretype-create-form.component.html',
  styleUrls: ['./settings-centretype-create-form.component.css']
})
export class SettingsCentretypeCreateFormComponent extends AppComponentBase implements OnInit {

  public centreTypeDetails: CentreTypeViewModel = new CentreTypeViewModel();

  public createCentreTypeForm: FormGroup;

  public get code(): AbstractControl { return this.createCentreTypeForm.get('Code'); }
  public get name(): AbstractControl { return this.createCentreTypeForm.get('Name'); }
  public get maxInvigilators(): AbstractControl { return this.createCentreTypeForm.get('MaxInvigilators'); }

  constructor(
    public routeConfig: Router,
    private readonly fb: FormBuilder,
    private centreTypeService: CentreTypeService,
    public validationService: FormValidationService
  ) {
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
    console.log(`Create centre type: save changes called.`);
    this.validationService.markFormGroupTouched(this.createCentreTypeForm);
    this.resetForm();

    if (!this.createCentreTypeForm.valid) {
      this.validationService.validateForm(this.createCentreTypeForm, false, true);
      return;
    }

    this.centreTypeDetails.code = this.code.value;
    this.centreTypeDetails.name = this.name.value;
    this.centreTypeDetails.maxInvigilators = this.maxInvigilators.value;

    this.actionPending = true;
    this.centreTypeService.createCentreType(this.centreTypeDetails)
    .subscribe(
      r1 => {
        console.log(r1);
        if (r1.status === EnumStatusCode.Ok) {
          this.updateOk = true;
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
    this.createCentreTypeForm = this.fb.group({
      Code: ['', Required('Please enter a centre code value')],
      Name: ['', Required('Please enter a centre type name')],
      MaxInvigilators: ['']
    });

    this.validationService.setFormFields(this.createCentreTypeForm);

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.validationService.detectChangesInForm(this.createCentreTypeForm);
  }

}

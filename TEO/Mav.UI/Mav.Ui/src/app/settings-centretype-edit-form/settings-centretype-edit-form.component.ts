import { Component, OnInit, Input } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { CentreTypeViewModel } from '../models/admin/centre-type.view.model';
import { Router } from '@angular/router';
import { CentreTypeService } from '../services/admin/centre-type.service';
import { EnumStatusCode } from '../models/generic.status';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { FormValidationService } from '../services/form-validation.service';
import { Required } from '../validators/required';

@Component({
  selector: 'app-settings-centretype-edit-form',
  templateUrl: './settings-centretype-edit-form.component.html',
  styleUrls: ['./settings-centretype-edit-form.component.css']
})
export class SettingsCentretypeEditFormComponent extends AppComponentBase implements OnInit {

  @Input() id: number;

  public centreTypeDetails: CentreTypeViewModel = new CentreTypeViewModel();

  public editCentreTypeForm: FormGroup;

  public get code(): AbstractControl { return this.editCentreTypeForm.get('Code'); }
  public get name(): AbstractControl { return this.editCentreTypeForm.get('Name'); }
  public get maxInvigilators(): AbstractControl { return this.editCentreTypeForm.get('MaxInvigilators'); }

  constructor(
    public routeConfig: Router,
    private centreTypeService: CentreTypeService,
    private readonly fb: FormBuilder,
    public validationService: FormValidationService
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.buildForm();
    this.actionPending = true;
    this.centreTypeService.getCentreTypeById(this.id)
    .subscribe(
      r1 => {
        console.log(r1);
        this.centreTypeDetails = r1;
        this.actionPending = false;

        this.editCentreTypeForm.controls['Code'].setValue(this.centreTypeDetails.code);
        this.editCentreTypeForm.controls['Name'].setValue(this.centreTypeDetails.name);
        this.editCentreTypeForm.controls['MaxInvigilators'].setValue(this.centreTypeDetails.maxInvigilators);
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

  public submitForm() {
    this.validationService.markFormGroupTouched(this.editCentreTypeForm);
    this.saveChanges(false);
  }

  public saveChanges(addMore: boolean): void {
    console.log(`Edit centre type: save changes called ${addMore}`);
    this.resetForm();

    if (!this.editCentreTypeForm.valid) {
      this.validationService.validateForm(this.editCentreTypeForm, false, true);
      return;
    }

    this.centreTypeDetails.code = this.code.value;
    this.centreTypeDetails.name = this.name.value;
    this.centreTypeDetails.maxInvigilators = this.maxInvigilators.value;

    this.actionPending = true;
    this.centreTypeService.updateCentreType(this.centreTypeDetails)
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

  public performDelete(): void {
    if (this.id !== null) {
      this.centreTypeService.deleteCentreType(this.id)
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
    this.editCentreTypeForm = this.fb.group({
      Code: ['', Required('Please enter a code value')],
      Name: ['', Required('Please enter a centre type name')],
      MaxInvigilators: ['']
    });

    this.validationService.setFormFields(this.editCentreTypeForm);

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.validationService.detectChangesInForm(this.editCentreTypeForm);
  }

}

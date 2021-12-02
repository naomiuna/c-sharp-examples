import { Component, OnInit, Input } from '@angular/core';
import { AppAdminAssessmentBase } from '../app.admin.assessment.base';
import { CentreTypeViewModel } from '../models/admin/centre-type.view.model';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { CentreTypeService } from '../services/admin/centre-type.service';
import { Router } from '@angular/router';
import { CentreServiceService } from '../services/centre-service.service';
import { FormValidationService } from '../services/form-validation.service';
import { CentreViewModel } from '../models/centre.view.model';
import { MatSlideToggleChange } from '@angular/material';
import { EnumStatusCode } from '../models/generic.status';
import { Required } from '../validators/required';

@Component({
  selector: 'app-centres-edit-form',
  templateUrl: './centres-edit-form.component.html',
  styleUrls: ['./centres-edit-form.component.css']
})
export class CentresEditFormComponent extends AppAdminAssessmentBase implements OnInit {

  @Input() id: number;

  public centreTypes: CentreTypeViewModel[] = [];
  public centreDetails: CentreViewModel = new CentreViewModel();

  public editCentreForm: FormGroup;
  public isEnabled: boolean;

  public get centreName(): AbstractControl { return this.editCentreForm.get('CentreName'); }
  public get centreNumber(): AbstractControl { return this.editCentreForm.get('CentreNumber'); }
  public get typeID(): AbstractControl { return this.editCentreForm.get('TypeID'); }

  constructor(
    public routeConfig: Router,
    private centreTypeService: CentreTypeService,
    private centreService: CentreServiceService,
    private readonly fb: FormBuilder,
    public validationService: FormValidationService
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.buildForm();
    this.actionPending = true;
    this.centreTypeService.getCentreTypeList()
    .subscribe(
      r1 => {
        console.log(r1);
        this.centreTypes = r1;
        this.centreService.getCentreById(this.id)
        .subscribe(
          r2 => {
            console.log(r2);
            this.centreDetails = r2;
            this.editCentreForm.controls['CentreName'].setValue(this.centreDetails.name);
            this.editCentreForm.controls['CentreNumber'].setValue(this.centreDetails.number);
            this.editCentreForm.controls['TypeID'].setValue(this.centreDetails.typeID);
            this.isEnabled = this.centreDetails.enabled;
            this.actionPending = false;
          },
          (e2: Error) => {
            this.onApiError(e2.message);
          }
        );
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

  public submitForm() {
    this.validationService.markFormGroupTouched(this.editCentreForm);
    this.saveChanges(false);
  }

  public saveChanges(addMore: boolean): void {
    console.log(`Edit Centre: save changes called ${addMore}`);
    this.resetForm();

    if (!this.editCentreForm.valid) {
      this.validationService.validateForm(this.editCentreForm, false, true);
      return;
    }

    this.centreDetails.name = this.centreName.value;
    this.centreDetails.number = this.centreNumber.value;
    this.centreDetails.typeID = this.typeID.value;
    this.centreDetails.enabled = this.isEnabled;

    this.actionPending = true;
    this.centreService.updateCentre(this.centreDetails)
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

  public performDelete(): void {
    if (this.id !== null) {
      this.centreService.deleteCentre(this.id)
      .subscribe(
        r1 => {
          console.log(r1);
          if (r1.status === EnumStatusCode.Ok) {
            this.routeConfig.navigate([`admin/centres`]);
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

  public cancelForm() {
    this.routeConfig.navigate([`admin/centres`]);
  }

  public changeEnabled(event: MatSlideToggleChange): void {
    this.isEnabled = event.checked;
  }

  private buildForm(): void {
    this.editCentreForm = this.fb.group({
      CentreName: ['', Required('Please enter your centre name')],
      CentreNumber: ['', Required('Please enter your centre number')],
      TypeID: ['', [Required('Please aselect a centre type')]]
    });

    this.validationService.setFormFields(this.editCentreForm);

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.validationService.detectChangesInForm(this.editCentreForm);
  }

}

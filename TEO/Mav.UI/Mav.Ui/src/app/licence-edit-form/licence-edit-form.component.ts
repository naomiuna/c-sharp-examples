import { Component, OnInit, Input } from '@angular/core';
import { LicenceViewModel } from '../models/admin/licence.view.model';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LicenceService } from '../services/licence.service';
import { FormValidationService } from '../services/form-validation.service';
import { AppComponentBase } from '../app.component.base';
import { UpdateLicenceViewModel } from '../models/admin/update-licence.view.model';
import { EnumStatusCode } from '../models/generic.status';
import { Required } from '../validators/required';
import { AssessmentYearViewModel } from '../models/admin/assessment-year.view.model';
import { AssessmentYearService } from '../services/admin/assessment-year.service';

@Component({
  selector: 'app-licence-edit-form',
  templateUrl: './licence-edit-form.component.html',
  styleUrls: ['./licence-edit-form.component.css']
})
export class LicenceEditFormComponent extends AppComponentBase implements OnInit {

  @Input() id: number;

  public licenceDetails: UpdateLicenceViewModel = new UpdateLicenceViewModel();
  public yearList: AssessmentYearViewModel[] = [];

  public editLicenceForm: FormGroup;

  public get maxCentres(): AbstractControl { return this.editLicenceForm.get('MaxCentres'); }
  public get cost(): AbstractControl { return this.editLicenceForm.get('Cost'); }
  public get academicYear(): AbstractControl { return this.editLicenceForm.get('AcademicYear'); }
  public get paid(): AbstractControl { return this.editLicenceForm.get('Paid'); }

  constructor(
    public routeConfig: Router,
    private licenceService: LicenceService,
    private assessmentYearService: AssessmentYearService,
    private readonly fb: FormBuilder,
    public validationService: FormValidationService
  )
  { 
    super(routeConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.buildForm();
    this.actionPending = true;

    this.assessmentYearService.getAssessmentYearList()
    .subscribe(
      r1 => {
        var currentDate = new Date();
        this.licenceService.getLicenceById<UpdateLicenceViewModel>(this.id)
        .subscribe(
          r2 => {
            this.licenceDetails = r2;
            this.yearList = r1.filter(x => x.yearID >= currentDate.getFullYear() - 1 || x.yearID == this.licenceDetails.academicYear);
  
            this.editLicenceForm.controls['MaxCentres'].setValue(this.licenceDetails.maxCentres);
            this.editLicenceForm.controls['Cost'].setValue(this.licenceDetails.cost);
            this.editLicenceForm.controls['AcademicYear'].setValue(this.licenceDetails.academicYear);
            this.editLicenceForm.controls['Paid'].setValue(this.licenceDetails.paid);

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
    this.validationService.markFormGroupTouched(this.editLicenceForm);
    this.saveChanges(false);
  }

  public saveChanges(addMore: boolean): void {
    console.log(`Edit licence: save changes called ${addMore}`);
    this.resetForm();

    if (!this.editLicenceForm.valid) {
      this.validationService.validateForm(this.editLicenceForm, false, true);
      return;
    }

    this.licenceDetails.maxCentres = this.maxCentres.value;
    this.licenceDetails.cost = this.cost.value;
    this.licenceDetails.academicYear = this.academicYear.value;
    this.licenceDetails.paid = this.paid.value;

    this.actionPending = true;
    this.licenceService.updateLicence(this.licenceDetails)
    .subscribe(
      r1 => {
        console.log(r1);
        this.actionPending = false;
        if (r1.status === EnumStatusCode.Ok) {
          this.updateOk = true;
          this.routeConfig.navigate([`admin/organisations-details/${this.licenceDetails.organisationID}`]);
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
    this.routeConfig.navigate([`admin/organisations-details/${this.licenceDetails.organisationID}`]);
  }

  public performDelete(): void {
    if (this.id !== null) {
      this.licenceService.deleteLicence(this.id)
      .subscribe(
        r1 => {
          console.log(r1);
          if (r1.status === EnumStatusCode.Ok) {
            this.routeConfig.navigate([`admin/organisations-details/${this.licenceDetails.organisationID}`]);
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
    
    this.editLicenceForm = this.fb.group({
      MaxCentres: ['', Required('Please specify a max centre amount')],
      Cost: ['', Required('Please specifiy a cost')],
      AcademicYear: ['', Required('Please enter an academic year')],
      Paid: [false],
    });

    this.validationService.setFormFields(this.editLicenceForm);

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.validationService.detectChangesInForm(this.editLicenceForm);
  }

  public saveChangedDisabled() {
    this.validationService.markFormGroupTouched(this.editLicenceForm);
    console.log(`Edit licence: save changes called false`);
    this.resetForm();

    if (!this.editLicenceForm.valid) {
      this.validationService.validateForm(this.editLicenceForm, false, true);
      return;
    }

    this.licenceDetails.maxCentres = this.maxCentres.value;
    this.licenceDetails.cost = this.cost.value;
    this.licenceDetails.academicYear = this.academicYear.value;
    this.licenceDetails.paid = this.paid.value;

    this.actionPending = true;
    this.licenceService.updateLicenceDisabled(this.licenceDetails)
    .subscribe(
      r1 => {
        console.log(r1);
        this.actionPending = false;
        if (r1.status === EnumStatusCode.Ok) {
          this.updateOk = true;
          this.routeConfig.navigate([`admin/organisations-details/${this.licenceDetails.organisationID}`]);
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
}

import { Component, OnInit } from '@angular/core';
import { FormValidationService } from '../services/form-validation.service';
import { AppComponentBase } from '../app.component.base';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddLicenceViewModel } from '../models/admin/add-licence.view.model';
import { OrganisationService } from '../services/organisation.service';
import { OrganisationViewModel } from '../models/admin/organisation.view.model';
import { Required } from '../validators/required';
import { LicenceService } from '../services/licence.service';
import { EnumStatusCode } from '../models/generic.status';
import { AssessmentYearViewModel } from '../models/admin/assessment-year.view.model';
import { AssessmentYearService } from '../services/admin/assessment-year.service';

@Component({
  selector: 'app-licence-create-form',
  templateUrl: './licence-create-form.component.html',
  styleUrls: ['./licence-create-form.component.css']
})
export class LicenceCreateFormComponent extends AppComponentBase implements OnInit {

  public licenceDetails: AddLicenceViewModel = new AddLicenceViewModel();
  public centreLimit: number;
  public organisationId: number;
  public yearList: AssessmentYearViewModel[] = [];

  private addLicenceForm: FormGroup;

  public get maxCentres(): AbstractControl { return this.addLicenceForm.get('MaxCentres'); }
  public get cost(): AbstractControl { return this.addLicenceForm.get('Cost'); }
  public get academicYear(): AbstractControl { return this.addLicenceForm.get('AcademicYear'); }
  public get paid(): AbstractControl { return this.addLicenceForm.get('Paid'); }

  constructor(
    public routeConfig: Router,
    private activeRoute: ActivatedRoute,
    private readonly fb: FormBuilder,
    private organisationService: OrganisationService,
    private licenceService: LicenceService,
    private assessmentYearService: AssessmentYearService,
    public validationService: FormValidationService
  ) 
  { 
    super(routeConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    const routeParams = this.activeRoute.snapshot.params;
    this.organisationId = routeParams.id;
    this.actionPending = true;
    this.assessmentYearService.getAssessmentYearList().subscribe(
      r1 => {
        console.log(r1);
        var currentDate = new Date();
        console.log(currentDate);
        this.yearList = r1.filter(x => x.yearID >= currentDate.getFullYear() - 1);
        this.actionPending = false;
        return;
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
    this.setFormFields();
  }

  public cancelForm() {
    this.routeConfig.navigate([`/admin/organisations-details/${this.organisationId}`]);
  }

  public submitForm() {
    this.validationService.markFormGroupTouched(this.addLicenceForm);
    this.saveChanges(false);
  }

  public saveChanges(addMore: boolean): void {
    console.log(`Create licence: save changes called ${addMore}`);
    this.validationService.markFormGroupTouched(this.addLicenceForm);
    this.resetForm();

    if(!this.addLicenceForm.valid) {
      this.validationService.validateForm(this.addLicenceForm,false, true);
      return;
    }

    this.licenceDetails.organisationID = this.organisationId;
    this.licenceDetails.maxCentres = this.maxCentres.value;
    this.licenceDetails.cost = this.cost.value;
    this.licenceDetails.academicYear = this.academicYear.value;
    this.licenceDetails.paid = this.paid.value;

    this.actionPending = true;
    this.licenceService.createLicence(this.licenceDetails)
    .subscribe(
      r1 => {
        this.actionPending = false;
        if (r1.status === EnumStatusCode.Ok) {
          this.updateOk = true;
          this.routeConfig.navigate([`/admin/organisations-details/${this.organisationId}`]);
        }
        else {
          this.error = r1.message;
        }
      },
      e1 => {
        console.log(e1);
        this.actionPending = false;
        this.error = `An unexpected error has occured`;
      }
    );
  }

  // Prepopulate the Max Centres field of the form upon initialisation
  private  setFormFields(): void {
    this.buildForm();
    this.organisationService.getOrganisationById<OrganisationViewModel>(this.organisationId).subscribe(
      r1 => {
        console.log(r1);
        this.centreLimit = r1.centreLimit;
        this.actionPending = false;
        this.buildForm();
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

  private buildForm(): void { 
    
    this.addLicenceForm = this.fb.group({
      MaxCentres: [this.centreLimit, Required('Please specify a max centre amount')],
      Cost: ['', Required('Please specifiy a cost')],
      AcademicYear: ['', Required('Please enter an academic year')],
      Paid: [false],
    });

    this.validationService.setFormFields(this.addLicenceForm);

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.validationService.detectChangesInForm(this.addLicenceForm);
  }

  public addLicenceDisabled() {
    console.log("Add and don't enabled account");
    this.validationService.markFormGroupTouched(this.addLicenceForm);
    console.log(`Create licence: save changes called false`);
    this.validationService.markFormGroupTouched(this.addLicenceForm);
    this.resetForm();

    if(!this.addLicenceForm.valid) {
      this.validationService.validateForm(this.addLicenceForm,false, true);
      return;
    }

    this.licenceDetails.organisationID = this.organisationId;
    this.licenceDetails.maxCentres = this.maxCentres.value;
    this.licenceDetails.cost = this.cost.value;
    this.licenceDetails.academicYear = this.academicYear.value;
    this.licenceDetails.paid = this.paid.value;

    this.actionPending = true;
    this.licenceService.createLicenceDisabled(this.licenceDetails)
    .subscribe(
      r1 => {
        this.actionPending = false;
        if (r1.status === EnumStatusCode.Ok) {
          this.updateOk = true;
          this.routeConfig.navigate([`/admin/organisations-details/${this.organisationId}`]);
        }
        else {
          this.error = r1.message;
        }
      },
      e1 => {
        console.log(e1);
        this.actionPending = false;
        this.error = `An unexpected error has occured`;
      }
    );
  }
}

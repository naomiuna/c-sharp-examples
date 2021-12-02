import { Component, OnInit, Input } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router } from '@angular/router';
import { OrganisationService } from '../services/organisation.service';
import { FormBuilder, AbstractControl, FormGroup } from '@angular/forms';
import { FormValidationService } from '../services/form-validation.service';
import { OrganisationTypeService } from '../services/admin/organisation-type.service';
import { OrganisationTypeViewModel } from '../models/admin/organisation-type.view.model';
import { UpdateOrganisationViewModel } from '../models/admin/update-organisation.view.model';
import { EnumStatusCode } from '../models/generic.status';
import { Required } from '../validators/required';
import { Email } from '../validators/email';

@Component({
  selector: 'app-organisations-edit-form',
  templateUrl: './organisations-edit-form.component.html',
  styleUrls: ['./organisations-edit-form.component.css']
})
export class OrganisationsEditFormComponent extends AppComponentBase implements OnInit {

  @Input() id: number;

  public orgDetails: UpdateOrganisationViewModel = new UpdateOrganisationViewModel();
  public orgTypes: OrganisationTypeViewModel[] = [];

  private formCentreLimit: number;

  public editOrgForm: FormGroup;

  public get organisationName(): AbstractControl { return this.editOrgForm.get('OrganisationName'); }
  public get typeID(): AbstractControl { return this.editOrgForm.get('TypeID'); }
  public get addressLine1(): AbstractControl { return this.editOrgForm.get('AddressLine1'); }
  public get addressLine2(): AbstractControl { return this.editOrgForm.get('AddressLine2'); }
  public get addressLine3(): AbstractControl { return this.editOrgForm.get('AddressLine3'); }
  public get mainContactName(): AbstractControl { return this.editOrgForm.get('MainContactName'); }
  public get mainContactEmail(): AbstractControl { return this.editOrgForm.get('MainContactEmail'); }
  public get leadFinancialName(): AbstractControl { return this.editOrgForm.get('LeadFinancialName'); }
  public get leadFinancialEmail(): AbstractControl { return this.editOrgForm.get('LeadFinancialEmail'); }
  public get leadFinancialNumber(): AbstractControl { return this.editOrgForm.get('LeadFinancialNumber'); }
  public get centreLimit(): AbstractControl { return this.editOrgForm.get('CentreLimit'); }

  constructor(
    public routeConfig: Router,
    private organisationService: OrganisationService,
    private organisationTypeService: OrganisationTypeService,
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

    this.organisationTypeService.getOrganisationTypeList().subscribe(
      r1 => {
        console.log(r1);
        this.orgTypes = r1.filter(x => x.name);
        this.organisationService.getOrganisationById<UpdateOrganisationViewModel>(this.id)
        .subscribe(
          r2 => {
            this.orgDetails = r2;
            this.editOrgForm.controls['OrganisationName'].setValue(this.orgDetails.organisationName);
            this.editOrgForm.controls['TypeID'].setValue(this.orgDetails.typeID);
            this.editOrgForm.controls['AddressLine1'].setValue(this.orgDetails.addressLine1);
            this.editOrgForm.controls['AddressLine2'].setValue(this.orgDetails.addressLine2);
            this.editOrgForm.controls['AddressLine3'].setValue(this.orgDetails.addressLine3);
            this.editOrgForm.controls['MainContactName'].setValue(this.orgDetails.mainContactName);
            this.editOrgForm.controls['MainContactEmail'].setValue(this.orgDetails.mainContactEmail);
            this.editOrgForm.controls['LeadFinancialName'].setValue(this.orgDetails.leadFinancialName);
            this.editOrgForm.controls['LeadFinancialEmail'].setValue(this.orgDetails.leadFinancialEmail);
            this.editOrgForm.controls['LeadFinancialNumber'].setValue(this.orgDetails.leadFinancialNumber);
            this.editOrgForm.controls['CentreLimit'].setValue(this.orgDetails.centreLimit);

            this.actionPending = false;
          }
        ),
        (e2: Error) => {
          this.onApiError(e2.message);
        }
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

  public submitForm() {
    this.validationService.markFormGroupTouched(this.editOrgForm);
    this.saveChanges(false);
  }

  public saveChanges(addMore: boolean): void {
    console.log(`Edit organisation: save changes called ${addMore}`);
    this.resetForm();

    if (!this.editOrgForm.valid) {
      this.validationService.validateForm(this.editOrgForm, false, true);
      return;
    }

    this.orgDetails.organisationName = this.organisationName.value;
    this.orgDetails.typeID = this.typeID.value;
    this.orgDetails.addressLine1 = this.addressLine1.value;
    this.orgDetails.addressLine2 = this.addressLine2.value;
    this.orgDetails.addressLine3 = this.addressLine3.value;
    this.orgDetails.mainContactName = this.mainContactName.value;
    this.orgDetails.mainContactEmail = this.mainContactEmail.value;
    this.orgDetails.leadFinancialName = this.leadFinancialName.value;
    this.orgDetails.leadFinancialEmail = this.leadFinancialEmail.value;
    this.orgDetails.leadFinancialNumber = this.leadFinancialNumber.value;
    this.orgDetails.centreLimit = this.centreLimit.value;

    this.actionPending = true;
    this.organisationService.updateOrganisation(this.orgDetails)
    .subscribe(
      r1 => {
        console.log(r1);
        this.actionPending = false;
        if (r1.status === EnumStatusCode.Ok) {
          this.updateOk = true;
          this.routeConfig.navigate([`admin/organisations-details/${this.id}`]);
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
    this.routeConfig.navigate([`admin/organisations-details/${this.id}`]);
  }

  public performDelete(): void {
    if (this.id !== null) {
      this.organisationService.deleteOrganisation(this.id)
      .subscribe(
        r1 => {
          console.log(r1);
          if (r1.status === EnumStatusCode.Ok) {
            this.routeConfig.navigate([`admin/licence-management/`]);
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
    this.editOrgForm = this.fb.group({
      OrganisationName: ['', Required('Please enter an organisation name')],
      TypeID: ['', Required('Please select an organisation type')],
      AddressLine1: ['', Required('Please enter an organisation address')],
      AddressLine2: [''],
      AddressLine3: [''],
      MainContactName: ['', Required('Please enter an a main contact name')],
      MainContactEmail: ['', [Required('Please enter a main contact email'), Email('Please enter a valid email address')]],
      LeadFinancialName: ['', Required('Please enter a lead financial name')],
      LeadFinancialEmail: ['', [Required('Please enter a lead financial email'), Email('Please enter a valid email address')]],
      LeadFinancialNumber: ['', Required('Please enter a lead financial telephone number')],
      CentreLimit: [this.formCentreLimit, Required('Please ensure a centre limit is defined')],
    });

    this.validationService.setFormFields(this.editOrgForm);

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.validationService.detectChangesInForm(this.editOrgForm);
  }

}

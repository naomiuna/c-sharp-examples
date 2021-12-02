import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { OrganisationService } from '../services/organisation.service';
import { FormValidationService } from '../services/form-validation.service';
import { Router } from '@angular/router';
import { OrganisationViewModel } from '../models/admin/organisation.view.model';
import { AddOrganisationViewModel } from '../models/admin/add-organisation.view.model';
import { OrganisationTypeViewModel } from '../models/admin/organisation-type.view.model';
import { OrganisationTypeService } from '../services/admin/organisation-type.service';
import { EnumStatusCode } from '../models/generic.status';
import { Required } from '../validators/required';
import { Email } from '../validators/email';

@Component({
  selector: 'app-organisations-create-form',
  templateUrl: './organisations-create-form.component.html',
  styleUrls: ['./organisations-create-form.component.css']
})
export class OrganisationsCreateFormComponent extends AppComponentBase implements OnInit {

  public orgDetails: AddOrganisationViewModel = new AddOrganisationViewModel();
  public orgTypes: OrganisationTypeViewModel[] = [];

  private formCentreLimit: number;

  public addOrgForm: FormGroup;

  public get organisationName(): AbstractControl { return this.addOrgForm.get('OrganisationName'); }
  public get typeID(): AbstractControl { return this.addOrgForm.get('TypeID'); }
  public get addressLine1(): AbstractControl { return this.addOrgForm.get('AddressLine1'); }
  public get addressLine2(): AbstractControl { return this.addOrgForm.get('AddressLine2'); }
  public get addressLine3(): AbstractControl { return this.addOrgForm.get('AddressLine3'); }
  public get mainContactName(): AbstractControl { return this.addOrgForm.get('MainContactName'); }
  public get mainContactEmail(): AbstractControl { return this.addOrgForm.get('MainContactEmail'); }
  public get leadFinancialName(): AbstractControl { return this.addOrgForm.get('LeadFinancialName'); }
  public get leadFinancialEmail(): AbstractControl { return this.addOrgForm.get('LeadFinancialEmail'); }
  public get leadFinancialNumber(): AbstractControl { return this.addOrgForm.get('LeadFinancialNumber'); }
  public get centreLimit(): AbstractControl { return this.addOrgForm.get('CentreLimit'); }

  constructor(
    public routeConfig: Router,
    private readonly fb: FormBuilder,
    private organisationService: OrganisationService,
    private organisationTypeService: OrganisationTypeService,
    public validationService: FormValidationService
  ) 
  { 
    super(routeConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.formCentreLimit = 0;
    this.buildForm();
    this.actionPending = true;
    this.organisationTypeService.getOrganisationTypeList().subscribe(
      r1 => {
        console.log(r1);
        this.orgTypes = r1.filter(x => x.name);
        this.actionPending = false;
        return;
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

  public cancelForm() {
    this.routeConfig.navigate([`admin/licence-management`]);
  }

  public submitForm() {
    this.validationService.markFormGroupTouched(this.addOrgForm);
    this.saveChanges(false);
  }

  public saveChanges(addMore: boolean): void {
    console.log(`Create organisation: save changes called ${addMore}`);
    this.validationService.markFormGroupTouched(this.addOrgForm);
    this.resetForm();

    if(!this.addOrgForm.valid) {
      this.validationService.validateForm(this.addOrgForm,false, true);
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

    console.log(this.typeID);
    console.log(this.orgDetails.typeID);

    this.actionPending = true;
    this.organisationService.createOrganisation(this.orgDetails)
    .subscribe(
      r1 => {
        console.log(r1);
        this.actionPending = false;
        if (r1.status === EnumStatusCode.Ok) {
          this.updateOk = true;
          this.routeConfig.navigate([`/admin/licence-management`]);
        } else {
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

  private buildForm(): void { 
    this.addOrgForm = this.fb.group({
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

    this.validationService.setFormFields(this.addOrgForm);

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.validationService.detectChangesInForm(this.addOrgForm);
  }

  private reBuildForm(): void {
    this.addOrgForm = this.fb.group({
      OrganisationName: [this.organisationName.value, Required('Please enter an organisation name')],
      TypeID: [this.typeID.value, Required('Please select an organisation type')],
      AddressLine1: [this.addressLine1.value, Required('Please enter an organisation address')],
      AddressLine2: [this.addressLine2.value],
      AddressLine3: [this.addressLine3.value],
      MainContactName: [this.mainContactName.value, Required('Please enter an a main contact name')],
      MainContactEmail: [this.mainContactEmail.value, [Required('Please enter a main contact email'), Email('Please enter a valid email address')]],
      LeadFinancialName: [this.leadFinancialName.value, Required('Please enter a lead financial name')],
      LeadFinancialEmail: [this.leadFinancialEmail.value, [Required('Please enter a lead financial email'), Email('Please enter a valid email address')]],
      LeadFinancialNumber: [this.leadFinancialNumber.value, Required('Please enter a lead financial telephone number')],
      CentreLimit: [this.formCentreLimit, Required('Please ensure a centre limit is defined')],
    });

    this.validationService.setFormFields(this.addOrgForm);

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.validationService.detectChangesInForm(this.addOrgForm);
  }

  public updateCentreLimit(): void {
    this.organisationTypeService.getOrganisationTypeById(this.typeID.value)
    .subscribe(
      r1 => {
        console.log(r1.centreLimit);
        this.actionPending = false;
        this.formCentreLimit = r1.centreLimit;
        this.reBuildForm();
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }
}

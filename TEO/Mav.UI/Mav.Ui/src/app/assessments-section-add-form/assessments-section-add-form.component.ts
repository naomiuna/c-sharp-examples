import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppAdminAssessmentBase } from '../app.admin.assessment.base';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidationService } from '../services/form-validation.service';
import { GenericEventArgs } from '../models/admin/generic-event-args';
import { EnumEventType } from '../models/admin/generic-event-type';
import { AddSectionViewModel } from '../models/admin/add-section.view.model';
import { SectionService } from '../services/section.service';
import { EnumStatusCode } from '../models/generic.status';
import { Required } from '../validators/required';
import { MatSlideToggleChange } from '@angular/material';
import { AssessmentService } from '../services/admin/assessment.service';

@Component({
  selector: 'app-assessments-section-add-form',
  templateUrl: './assessments-section-add-form.component.html',
  styleUrls: ['./assessments-section-add-form.component.css']
})
export class AssessmentsSectionAddFormComponent extends AppAdminAssessmentBase implements OnInit {

  @Input() id: number; // Assessment ID

  @Output() sectionActionRequest: EventEmitter<GenericEventArgs>;

  private eventArgs: GenericEventArgs;

  public sectionDetails: AddSectionViewModel = new AddSectionViewModel();

  public addSectionForm: FormGroup;
  public isRandom: boolean;
  public eoQualification: boolean;

  public get number(): AbstractControl { return this.addSectionForm.get('Number'); }
  public get title(): AbstractControl { return this.addSectionForm.get('Title'); }
  public get reference(): AbstractControl { return this.addSectionForm.get('Reference'); }
  public get quantity(): AbstractControl { return this.addSectionForm.get('Quantity'); }
  public get maxAttempts(): AbstractControl { return this.addSectionForm.get('MaxAttempts'); }
  public get timeLimit(): AbstractControl { return this.addSectionForm.get('TimeLimit') }

  constructor(
    public routeConfig: Router,
    private readonly fb: FormBuilder,
    public validationService: FormValidationService,
    public sectionService: SectionService,
    public assessmentService: AssessmentService
  ) {
    super(routeConfig);

    this.sectionActionRequest = new EventEmitter<GenericEventArgs>();
  }

  ngOnInit() {
    super.ngOnInit();
    this.buildForm();
    this.isRandom = false;
    this.sectionDetails.quantity = 0;
    // Check if this section belongs to an EO Qualification Assessment
    this.assessmentService.isEoQualification(this.id)
    .subscribe(
      r1 => {
        console.log(r1);
        this.actionPending = false;
        this.eoQualification = r1;
        if(this.eoQualification)
        {
          this.buildForm(this.eoQualification);
        }
      },
      e1 => {
        console.log(e1);
        this.actionPending = false;
        this.error = `An unexpected error has occurred`;
      }
    )
  }

  sectionAddComplete(newID: number): void {
    this.eventArgs = new GenericEventArgs();
    this.eventArgs.keyID = newID;
    this.eventArgs.eventType = EnumEventType.SectionAdded;
    this.sectionActionRequest.emit(this.eventArgs);
  }

  public cancelForm() {
    this.eventArgs = new GenericEventArgs();
    this.eventArgs.keyID = this.id;
    this.eventArgs.eventType = EnumEventType.SectionAddCancel;
    this.sectionActionRequest.emit(this.eventArgs);
  }

  public changeIsRandom(event: MatSlideToggleChange): void {
    this.isRandom = event.checked;
    if (!this.isRandom) {
      this.sectionDetails.quantity = 0;
      this.addSectionForm.controls['Quantity'].setValue(this.sectionDetails.quantity);
    }
  }

  public submitForm() {
    this.validationService.markFormGroupTouched(this.addSectionForm);
    this.saveChanges(false);
  }

  public saveChanges(addMore: boolean): void {
    console.log(`Add Section: save changes called ${addMore}`);
    this.resetForm();

    console.log("EO Qualification: ", this.eoQualification);

    if (!this.addSectionForm.valid) {
      this.validationService.validateForm(this.addSectionForm, false, true);
      return;
    }

    this.sectionDetails.assessmentID = this.id;
    this.sectionDetails.number = this.number.value;
    this.sectionDetails.title = this.title.value;
    this.sectionDetails.reference = this.reference.value;
    this.sectionDetails.isRandom = this.isRandom;
    this.sectionDetails.quantity = this.quantity.value;
    if(this.eoQualification == true)
    {
      this.sectionDetails.maxAttempts = this.maxAttempts.value;
      this.sectionDetails.timeLimit =  Math.floor(this.timeLimit.value * 60);
    }
    this.sectionDetails.isEoQualification = this.eoQualification;

    this.actionPending = true;
    this.sectionService.createSection(this.sectionDetails)
    .subscribe(
      r1 => {
        console.log(r1);
        this.actionPending = false;
        if (r1.status === EnumStatusCode.Ok) {
          this.updateOk = true;
          this.sectionAddComplete(r1.keyID);
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

  private buildForm(eoQual?: boolean): void {
    if(eoQual)
    {
      this.addSectionForm = this.fb.group({
        Number: ['', Required('Please enter a section number')],
        Title: ['', Required('Please enter a section title')],
        Reference: ['', Required('Please enter a section reference')],
        IsRandom: [''],
        Quantity: [''],
        MaxAttempts: [''],
        TimeLimit: ['', Required('Please enter a maximum time limit for the section')]
      });
    }
    else
    {
      this.addSectionForm = this.fb.group({
        Number: ['', Required('Please enter a section number')],
        Title: ['', Required('Please enter a section title')],
        Reference: ['', Required('Please enter a section reference')],
        IsRandom: [''],
        Quantity: [''],
        MaxAttempts: [''],
        TimeLimit: ['']
      });
    }

    this.validationService.setFormFields(this.addSectionForm);

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.validationService.detectChangesInForm(this.addSectionForm);
  }

}

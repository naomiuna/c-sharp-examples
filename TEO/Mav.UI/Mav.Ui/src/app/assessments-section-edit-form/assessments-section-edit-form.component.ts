import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidationService } from '../services/form-validation.service';
import { tinymceDefaultSettings } from 'angular-tinymce';
import * as TinyMce from 'tinymce';
import { AppAdminAssessmentBase } from '../app.admin.assessment.base';
import { GenericEventArgs } from '../models/admin/generic-event-args';
import { EnumEventType } from '../models/admin/generic-event-type';
import { UpdateSectionViewModel } from '../models/admin/update-section.view.model';
import { SectionService } from '../services/section.service';
import { MatSlideToggleChange } from '@angular/material';
import { EnumStatusCode } from '../models/generic.status';
import { Required } from '../validators/required';
import { environment } from '../../environments/environment';
import { AssessmentService } from '../services/admin/assessment.service';

declare function tinyImagesPicker(cb: any, value: any, meta: any): any;

@Component({
  selector: 'app-assessments-section-edit-form',
  templateUrl: './assessments-section-edit-form.component.html',
  styleUrls: ['./assessments-section-edit-form.component.css']
})
export class AssessmentsSectionEditFormComponent extends AppAdminAssessmentBase implements OnInit {

  @Input() id: number; // Section ID

  @Output() sectionActionRequest: EventEmitter<GenericEventArgs>;

  private eventArgs: GenericEventArgs;

  public sectionDetails: UpdateSectionViewModel = new UpdateSectionViewModel();

  public editSectionForm: FormGroup;
  public isRandom: boolean;
  public customEditorSettings: TinyMce.Settings | any;
  public eoQualification: boolean;

  public get number(): AbstractControl { return this.editSectionForm.get('Number'); }
  public get title(): AbstractControl { return this.editSectionForm.get('Title'); }
  public get reference(): AbstractControl { return this.editSectionForm.get('Reference'); }
  public get quantity(): AbstractControl { return this.editSectionForm.get('Quantity'); }
  public get information(): AbstractControl { return this.editSectionForm.get('Information'); }
  public get maxAttempts(): AbstractControl {return this.editSectionForm.get('MaxAttempts'); }
  public get timeLimit(): AbstractControl {return this.editSectionForm.get('TimeLimit'); }

  public apiBaseUrl: string;
  public authorityUrl: string;

  constructor(
    public routeConfig: Router,
    private readonly fb: FormBuilder,
    public validationService: FormValidationService,
    public sectionService: SectionService,
    public assessmentService: AssessmentService
  ) {
    super(routeConfig);

    this.sectionActionRequest = new EventEmitter<GenericEventArgs>();

    this.apiBaseUrl = environment.apiBase;
    this.authorityUrl = environment.authorityBase;

    this.customEditorSettings = tinymceDefaultSettings();
    this.customEditorSettings.plugins = 'lists fullscreen spellchecker code image media link textcolor table';
    this.customEditorSettings.height = 350;
    this.customEditorSettings.file_picker_callback = tinyImagesPicker;
    this.customEditorSettings.toolbar = 'undo redo | styleselect | bold italic underline | forecolor backcolor | alignleft aligncentre alignright alignjustify | numlist bullist | outdent indent | table | tools image | link unlink';
  }

  ngOnInit() {
    super.ngOnInit();
    this.buildForm();
    this.actionPending = true;
    this.sectionService.getSectionById<UpdateSectionViewModel>(this.id)
    .subscribe(
      r1 => {
        console.log(r1);
        this.sectionDetails = r1;

        this.eoQualification = this.sectionDetails.isEoQualification;
        console.log("EO Qualification?", this.eoQualification);

        this.editSectionForm.controls['Number'].setValue(this.sectionDetails.number);
        this.editSectionForm.controls['Title'].setValue(this.sectionDetails.title);
        this.editSectionForm.controls['Reference'].setValue(this.sectionDetails.reference);
        this.editSectionForm.controls['Quantity'].setValue(this.sectionDetails.quantity);
        this.editSectionForm.controls['Information'].setValue(this.sectionDetails.information);
        this.editSectionForm.controls['MaxAttempts'].setValue(this.sectionDetails.maxAttempts);

        if(this.eoQualification == true) // rebuild form for the eo qualification sections
        {
          this.buildForm(this.eoQualification);
          this.editSectionForm.controls['Number'].setValue(this.sectionDetails.number);
          this.editSectionForm.controls['Title'].setValue(this.sectionDetails.title);
          this.editSectionForm.controls['Reference'].setValue(this.sectionDetails.reference);
          this.editSectionForm.controls['Quantity'].setValue(this.sectionDetails.quantity);
          this.editSectionForm.controls['Information'].setValue(this.sectionDetails.information);
          this.editSectionForm.controls['MaxAttempts'].setValue(this.sectionDetails.maxAttempts);
          this.editSectionForm.controls['TimeLimit'].setValue(Math.floor(this.sectionDetails.timer.timeLimit / 60));
        }

        this.isRandom = this.sectionDetails.isRandom;
        this.actionPending = false;
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

  sectionUpdateComplete(): void {
    this.eventArgs = new GenericEventArgs();
    this.eventArgs.keyID = this.id;
    this.eventArgs.eventType = EnumEventType.SectionUpdated;
    this.sectionActionRequest.emit(this.eventArgs);
  }

  public cancelForm() {
    this.eventArgs = new GenericEventArgs();
    this.eventArgs.keyID = this.id;
    this.eventArgs.eventType = EnumEventType.SectionUpdateCancel;
    this.sectionActionRequest.emit(this.eventArgs);
  }

  public changeIsRandom(event: MatSlideToggleChange): void {
    this.isRandom = event.checked;
    if (!this.isRandom) {
      this.sectionDetails.quantity = 0;
      this.editSectionForm.controls['Quantity'].setValue(this.sectionDetails.quantity);
    }
  }

  public submitForm() {
    this.validationService.markFormGroupTouched(this.editSectionForm);
    this.saveChanges(false);
  }

  public saveChanges(addMore: boolean): void {
    console.log(`Edit Section: save changes called ${addMore}`);
    this.resetForm();

    if (!this.editSectionForm.valid) {
      this.validationService.validateForm(this.editSectionForm, false, true);
      return;
    }

    this.sectionDetails.number = this.number.value;
    this.sectionDetails.title = this.title.value;
    this.sectionDetails.reference = this.reference.value;
    this.sectionDetails.isRandom = this.isRandom;
    this.sectionDetails.quantity = this.quantity.value;
    this.sectionDetails.information = this.information.value;
    this.sectionDetails.maxAttempts = this.maxAttempts.value;

    if(this.eoQualification == true)
    {
      this.sectionDetails.timer.timeLimit = Math.floor(this.timeLimit.value * 60);
    }

    this.actionPending = true;
    this.sectionService.updateSection(this.sectionDetails)
    .subscribe(
      r1 => {
        console.log(r1);
        this.actionPending = false;
        if (r1.status === EnumStatusCode.Ok) {
          this.updateOk = true;
          this.sectionUpdateComplete();
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
      this.editSectionForm = this.fb.group({
        Number: ['', Required('Please enter a section number')],
        Title: ['', Required('Please enter a section title')],
        Reference: ['', Required('Please enter a section reference')],
        IsRandom: [''],
        Quantity: [''],
        Information: [''],
        MaxAttempts: [''],
        TimeLimit:['', Required('Please enter a maximum time limit for the section')]
      });
    }
    else
    {
      this.editSectionForm = this.fb.group({
        Number: ['', Required('Please enter a section number')],
        Title: ['', Required('Please enter a section title')],
        Reference: ['', Required('Please enter a section reference')],
        IsRandom: [''],
        Quantity: [''],
        Information: [''],
        MaxAttempts: ['']
      });
    }

    this.validationService.setFormFields(this.editSectionForm);

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.validationService.detectChangesInForm(this.editSectionForm);
  }

}

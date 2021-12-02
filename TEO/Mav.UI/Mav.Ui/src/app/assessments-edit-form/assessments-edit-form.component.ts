import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidationService } from '../services/form-validation.service';
import { EnumStatusCode } from '../models/generic.status';
import { Required } from '../validators/required';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { tinymceDefaultSettings } from 'angular-tinymce';
import * as TinyMce from 'tinymce';
import { UpdateAssessmentViewModel } from '../models/admin/update-assessment.view.model';
import { AssessmentService } from '../services/admin/assessment.service';
import { AssessmentYearService } from '../services/admin/assessment-year.service';
import { AssessmentYearViewModel } from '../models/admin/assessment-year.view.model';
import { AssessmentRoleService } from '../services/admin/assessment-role.service';
import { AssessmentRoleViewModel } from '../models/admin/assessment-role.view.model';
import { AppAdminAssessmentBase } from '../app.admin.assessment.base';
import { environment } from '../../environments/environment';

declare function tinyImagesPicker(cb: any, value: any, meta: any): any;

@Component({
  selector: 'app-assessments-edit-form',
  templateUrl: './assessments-edit-form.component.html',
  styleUrls: ['./assessments-edit-form.component.css']
})
export class AssessmentsEditFormComponent extends AppAdminAssessmentBase implements OnInit {

  @Input() id: number;

  public assDetails: UpdateAssessmentViewModel = {
    id: 0,
    title: '',
    yearID: 0,
    eoQualification: false,
    roleID:'',
    minScore: 0,
    guide: '',
    objectives: '',
    published: false,
    assessmentGrade: null
  };
  public yearList: AssessmentYearViewModel[] = [];
  public roleList: AssessmentRoleViewModel[] = [];

  public eoQualification: boolean;

  public editAssForm: FormGroup;
  public isPublished: boolean;
  public customEditorSettings: TinyMce.Settings | any;

  public get title(): AbstractControl { return this.editAssForm.get('Title'); }
  public get yearID(): AbstractControl { return this.editAssForm.get('YearID'); }
  public get roleID(): AbstractControl { return this.editAssForm.get('RoleID'); }
  public get minScore(): AbstractControl { return this.editAssForm.get('MinScore'); }
  public get passScore(): AbstractControl { return this.editAssForm.get('PassScore'); }
  public get meritScore(): AbstractControl { return this.editAssForm.get('MeritScore'); }
  public get distinctionScore(): AbstractControl { return this.editAssForm.get('DistinctionScore'); }
  public get guide(): AbstractControl { return this.editAssForm.get('Guide'); }
  public get objectives(): AbstractControl { return this.editAssForm.get('Objectives'); }

  public apiBaseUrl: string;
  public authorityUrl: string;

  constructor(
    public routeConfig: Router,
    private assessmentService: AssessmentService,
    private assessmentYearService: AssessmentYearService,
    private assessmentRoleService: AssessmentRoleService,
    private readonly fb: FormBuilder,
    public validationService: FormValidationService
  ) {
    super(routeConfig);

    this.apiBaseUrl = environment.apiBase;
    this.authorityUrl = environment.authorityBase;

    this.customEditorSettings = tinymceDefaultSettings();
    this.customEditorSettings.plugins = 'lists fullscreen spellchecker code image media link textcolor table';
    this.customEditorSettings.height = 350;
    this.customEditorSettings.file_picker_callback = tinyImagesPicker;
    this.customEditorSettings.toolbar = 'undo redo | styleselect | bold italic underline | forecolor backcolor | alignleft aligncentrle alignright alignjustify | numlist bullist | outdent indent | table | tools image | link unlink';
  }

  

  ngOnInit() {
    super.ngOnInit();
    this.buildForm();
    this.actionPending = true;
    this.assessmentRoleService.getAssessmentRoleList().subscribe(
      r1 => {
        console.log(r1);
        this.roleList = r1.filter(x => x.name != "Administrator" && x.name != "Editor" && x.name != "ReadOnly");
        this.actionPending = false;
        return;
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  
    this.assessmentYearService.getAssessmentYearList()
    .subscribe(
      r1 => {
        console.log(r1);
        var currentDate = new Date();
        this.assessmentService.getAssessmentById<UpdateAssessmentViewModel>(this.id)
        .subscribe(
          r2 => {                       
            this.assDetails = r2;
            this.yearList = r1.filter(x => x.yearID >= currentDate.getFullYear() - 1 || x.yearID == this.assDetails.yearID);
            console.log(this.assDetails);
            this.editAssForm.controls['Title'].setValue(this.assDetails.title);
            this.editAssForm.controls['YearID'].setValue(this.assDetails.yearID);
            this.editAssForm.controls['RoleID'].setValue(this.assDetails.roleID);
            this.editAssForm.controls['MinScore'].setValue(this.assDetails.minScore);
            this.editAssForm.controls['Guide'].setValue(this.assDetails.guide);
            this.editAssForm.controls['Objectives'].setValue(this.assDetails.objectives);
            this.isPublished = this.assDetails.published;
            this.eoQualification = this.assDetails.eoQualification;
            if(this.assDetails.eoQualification == true) // rebuild the form with the new fields for an EO Qualification Assessment
            {
              this.buildForm(this.eoQualification);
              this.editAssForm.controls['Title'].setValue(this.assDetails.title);
              this.editAssForm.controls['YearID'].setValue(this.assDetails.yearID);
              this.editAssForm.controls['RoleID'].setValue(this.assDetails.roleID);
              this.editAssForm.controls['MinScore'].setValue(this.assDetails.minScore);
              this.editAssForm.controls['Guide'].setValue(this.assDetails.guide);
              this.editAssForm.controls['Objectives'].setValue(this.assDetails.objectives);
              this.editAssForm.controls['PassScore'].setValue(this.assDetails.assessmentGrade.passScore);
              this.editAssForm.controls['MeritScore'].setValue(this.assDetails.assessmentGrade.meritScore);
              this.editAssForm.controls['DistinctionScore'].setValue(this.assDetails.assessmentGrade.distinctionScore);
            }
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
    this.validationService.markFormGroupTouched(this.editAssForm);
    this.saveChanges(false);
  }

  public saveChanges(addMore: boolean): void {
    console.log(`Edit Assessment: save changes called ${addMore}`);
    this.resetForm();

    if (!this.editAssForm.valid) {
      this.validationService.validateForm(this.editAssForm, false, true);
      return;
    }

    this.assDetails.title = this.title.value;
    this.assDetails.yearID = this.yearID.value;
    this.assDetails.roleID = this.roleID.value;
    this.assDetails.minScore = this.minScore.value;
    this.assDetails.guide = this.guide.value;
    this.assDetails.objectives = this.objectives.value;
    this.assDetails.published = this.isPublished;

    console.log(this.assDetails.eoQualification);

    if(this.eoQualification == true)
    {
      this.assDetails.assessmentGrade.passScore = this.passScore.value;
      this.assDetails.assessmentGrade.meritScore = this.meritScore.value;
      this.assDetails.assessmentGrade.distinctionScore = this.distinctionScore.value;
    }

    this.actionPending = true;
    this.assessmentService.updateAssessment(this.assDetails)
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
    this.routeConfig.navigate([`admin/assessments`]);
  }

  public changePublished(event: MatSlideToggleChange): void {
    this.isPublished = event.checked;
  }

  private buildForm(eoQual?: boolean): void {
    if(eoQual)
    {
      this.editAssForm = this.fb.group({
        Title: ['', Required('Please enter your title')],
        YearID: ['', Required('Please select an academic year')],
        RoleID: ['', Required('Please select a target role')],
        MinScore: ['', [Required('Please enter a minimum score')]],
        PassScore: ['', [Required('Please enter a minimum score')]],
        MeritScore: ['', [Required('Please enter a minimum score')]],
        DistinctionScore: ['', [Required('Please enter a minimum score')]],
        Guide: [''],
        Objectives: ['']
      });
    }
    else
    {
      this.editAssForm = this.fb.group({
        Title: ['', Required('Please enter your title')],
        YearID: ['', Required('Please select an academic year')],
        RoleID: ['', Required('Please select a target role')],
        MinScore: ['', [Required('Please enter a minimum score')]],
        Guide: [''],
        Objectives: ['']
      });
    }

    this.validationService.setFormFields(this.editAssForm);

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.validationService.detectChangesInForm(this.editAssForm);
  }
}

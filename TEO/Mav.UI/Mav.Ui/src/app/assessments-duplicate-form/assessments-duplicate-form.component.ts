import { Component, OnInit, Input } from '@angular/core';
import { AppAdminAssessmentBase } from '../app.admin.assessment.base';
import { DuplicateAssessmentViewModel } from '../models/admin/duplicate-assessment.view.model';
import { AssessmentYearViewModel } from '../models/admin/assessment-year.view.model';
import { AssessmentRoleViewModel } from '../models/admin/assessment-role.view.model';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AssessmentService } from '../services/admin/assessment.service';
import { AssessmentYearService } from '../services/admin/assessment-year.service';
import { AssessmentRoleService } from '../services/admin/assessment-role.service';
import { FormValidationService } from '../services/form-validation.service';
import { environment } from '../../environments/environment';
import { UpdateAssessmentViewModel } from '../models/admin/update-assessment.view.model';
import { EnumStatusCode } from '../models/generic.status';
import { Required } from '../validators/required';

@Component({
  selector: 'app-assessments-duplicate-form',
  templateUrl: './assessments-duplicate-form.component.html',
  styleUrls: ['./assessments-duplicate-form.component.css']
})
export class AssessmentsDuplicateFormComponent extends AppAdminAssessmentBase implements OnInit {

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

  // Duplicated assessment unique details
  public dupAssDetails: DuplicateAssessmentViewModel = new DuplicateAssessmentViewModel();
  public duplicateOk: boolean;

  public yearList: AssessmentYearViewModel[] = [];
  public roleList: AssessmentRoleViewModel[] = [];

  public dupAssForm: FormGroup;
  
  public get title(): AbstractControl { return this.dupAssForm.get('Title'); }
  public get yearID(): AbstractControl { return this.dupAssForm.get('YearID'); }
  public get roleID(): AbstractControl { return this.dupAssForm.get('RoleID'); }

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
            console.log(r2);
            this.assDetails = r2;
            this.yearList = r1.filter(x => x.yearID >= currentDate.getFullYear() - 1 || x.yearID == this.assDetails.yearID);
            
            // Build form 
            this.dupAssForm.controls['Title'].setValue(this.assDetails.title);
            this.dupAssForm.controls['YearID'].setValue(this.assDetails.yearID);
            this.dupAssForm.controls['RoleID'].setValue(this.assDetails.roleID);

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
    )
  }

  public submitForm() {
    this.validationService.markFormGroupTouched(this.dupAssForm);
    this.saveChanges(false);
  }

  public saveChanges(addMore: boolean): void {
    console.log(`Duplicatiing assessment: save changes called ${addMore}`);
    this.resetForm();

    if (!this.dupAssForm.valid) {
      this.validationService.validateForm(this.dupAssForm, false, true);
      return;
    }

    this.dupAssDetails.assessmentId = this.id;
    this.dupAssDetails.title = this.title.value;
    this.dupAssDetails.yearID = this.yearID.value;
    this.dupAssDetails.roleID = this.roleID.value;
    //this.dupAssDetails.createdBy = "";

    this.actionPending = true;
    this.assessmentService.duplicateAssessment(this.dupAssDetails)
    .subscribe(
      r1 => {
        console.log(r1);
        this.actionPending = false;
        if (r1.status === EnumStatusCode.Ok) {
          this.duplicateOk = true;
          this.routeConfig.navigate([`/admin/assessments-edit/${r1.keyID}`]);
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

  private buildForm(): void {

    this.dupAssForm = this.fb.group({
      Title: ['', Required('Please enter your title')],
      YearID: ['', Required('Please select an academic year')],
      RoleID: ['', Required('Please select a target role')]
    });

    this.validationService.setFormFields(this.dupAssForm);

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.validationService.detectChangesInForm(this.dupAssForm);
  }
}

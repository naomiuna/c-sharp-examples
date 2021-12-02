import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponentBase } from '../app.component.base';
import { EnumStatusCode } from '../models/generic.status';
import { Required } from '../validators/required';
import { FormValidationService } from '../services/form-validation.service';
import { AddAssessmentViewModel } from '../models/admin/add-assessment.view.model';
import { AssessmentService } from '../services/admin/assessment.service';
import { AssessmentYearService } from '../services/admin/assessment-year.service';
import { AssessmentYearViewModel } from '../models/admin/assessment-year.view.model';
import { AssessmentRoleService } from '../services/admin/assessment-role.service';
import { AssessmentRoleViewModel } from '../models/admin/assessment-role.view.model';
import { dateToString } from '../validators/date-functions';

@Component({
  selector: 'app-assessments-create-form',
  templateUrl: './assessments-create-form.component.html',
  styleUrls: ['./assessments-create-form.component.css']
})
export class AssessmentsCreateFormComponent extends AppComponentBase implements OnInit {

  public assDetails: AddAssessmentViewModel = new AddAssessmentViewModel();
  public yearList: AssessmentYearViewModel[] = [];
  public roleList: AssessmentRoleViewModel[] = [];


  public addAssForm: FormGroup;

  public get title(): AbstractControl { return this.addAssForm.get('Title'); }
  public get yearID(): AbstractControl { return this.addAssForm.get('YearID'); }
  public get minScore(): AbstractControl { return this.addAssForm.get('MinScore'); }
  public get roleID(): AbstractControl { return this.addAssForm.get('RoleID'); }

  constructor(
    public routeConfig: Router,
    private readonly fb: FormBuilder,
    public validationService: FormValidationService,
    private assessmentService: AssessmentService,
    private assessmentYearService: AssessmentYearService,
    private assessmentRoleService: AssessmentRoleService
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.buildForm();
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
  }

  public submitForm() {
    this.validationService.markFormGroupTouched(this.addAssForm);
    this.saveChanges(false);
  }

  public cancelForm(): void {
    this.routeConfig.navigate(['/admin/assessments']);
  }

  public addAnother(): void {
    this.refreshScreenSkipLocation('/admin/assessments-create');
  }

  public saveChanges(addMore: boolean): void {
    console.log(`Add Assessment: save changes called ${addMore}`);
    this.resetForm();

    if (!this.addAssForm.valid) {
      this.validationService.validateForm(this.addAssForm, false, true);
      return;
    }

    this.assDetails.title = this.title.value;
    this.assDetails.yearID = this.yearID.value;
    this.assDetails.minScore = this.minScore.value;
    this.assDetails.roleID = this.roleID.value

    this.actionPending = true;
    this.assessmentService.createAssessment(this.assDetails)
    .subscribe(
      r1 => {
        console.log(r1);
        this.actionPending = false;
        if (r1.status === EnumStatusCode.Ok) {
          this.updateOk = true;
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

  private buildForm(): void {
    this.addAssForm = this.fb.group({
      Title: ['', Required('Please enter your title')],
      YearID: ['', Required('Please select an academic year')],
      MinScore: ['', [Required('Please enter a minimum score')]],
      RoleID: ['', Required('Please select a target role')]
    });

    this.validationService.setFormFields(this.addAssForm);

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.validationService.detectChangesInForm(this.addAssForm);
  }

}

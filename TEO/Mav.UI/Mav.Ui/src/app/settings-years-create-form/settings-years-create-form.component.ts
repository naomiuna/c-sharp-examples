import { Component, OnInit } from '@angular/core';
import { AssessmentYearViewModel } from '../models/admin/assessment-year.view.model';
import { AppComponentBase } from '../app.component.base';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AssessmentYearService } from '../services/admin/assessment-year.service';
import { FormValidationService } from '../services/form-validation.service';
import { Required } from '../validators/required';
import { EnumStatusCode } from '../models/generic.status';

@Component({
  selector: 'app-settings-years-create-form',
  templateUrl: './settings-years-create-form.component.html',
  styleUrls: ['./settings-years-create-form.component.css']
})
export class SettingsYearsCreateFormComponent  extends AppComponentBase implements OnInit {

  public yearDetails: AssessmentYearViewModel = new AssessmentYearViewModel();

  public createYearForm: FormGroup;

  public get year(): AbstractControl { return this.createYearForm.get('Year'); }
  public get display(): AbstractControl { return this.createYearForm.get('Display'); }

  constructor(
    public routeConfig: Router,
    private readonly fb: FormBuilder,
    private assessmentYearService: AssessmentYearService,
    public validationService: FormValidationService
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.buildForm();
  }

  public cancelForm() {
    this.routeConfig.navigate([`admin/settings`]);
  }

  public saveChanges(): void {
    console.log(`Create centre type: save changes called.`);
    this.validationService.markFormGroupTouched(this.createYearForm);
    this.resetForm();

    if (!this.createYearForm.valid) {
      this.validationService.validateForm(this.createYearForm, false, true);
      return;
    }

    this.yearDetails.yearID = this.year.value;
    this.yearDetails.display = this.display.value;

    this.actionPending = true;
    this.assessmentYearService.createAssessmentYear(this.yearDetails)
    .subscribe(
      r1 => {
        console.log(r1);
        if (r1.status === EnumStatusCode.Ok) {
          this.updateOk = true;
        } else {
          this.error = r1.message;
        }
        this.actionPending = false;
      },
      e1 => {
        console.log(e1);
        this.actionPending = false;
        this.error = `An unexpected error has occurred`;
      }
    );
  }

  private buildForm(): void {
    this.createYearForm = this.fb.group({
      Year: ['', Required('Please enter a year value')],
      Display: ['', Required('Please enter a display name')]
    });

    this.validationService.setFormFields(this.createYearForm);

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.validationService.detectChangesInForm(this.createYearForm);
  }
}

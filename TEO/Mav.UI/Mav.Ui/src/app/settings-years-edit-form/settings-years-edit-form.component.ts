import { Component, OnInit, Input } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router } from '@angular/router';
import { AssessmentYearViewModel } from '../models/admin/assessment-year.view.model';
import { AssessmentYearService } from '../services/admin/assessment-year.service';
import { EnumStatusCode } from '../models/generic.status';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { FormValidationService } from '../services/form-validation.service';
import { Required } from '../validators/required';

@Component({
  selector: 'app-settings-years-edit-form',
  templateUrl: './settings-years-edit-form.component.html',
  styleUrls: ['./settings-years-edit-form.component.css']
})
export class SettingsYearsEditFormComponent extends AppComponentBase implements OnInit {

  @Input() id: number;

  public yearDetails: AssessmentYearViewModel = new AssessmentYearViewModel();

  public editYearForm: FormGroup;

  public get year(): AbstractControl { return this.editYearForm.get('Year'); }
  public get display(): AbstractControl { return this.editYearForm.get('Display'); }

  constructor(
    public routeConfig: Router,
    private assessmentYearService: AssessmentYearService,
    private readonly fb: FormBuilder,
    public validationService: FormValidationService
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.buildForm();
    this.actionPending = true;
    this.assessmentYearService.getAssessmentYearById(this.id)
    .subscribe(
      r1 => {
        console.log(r1);
        this.yearDetails = r1;
        this.actionPending = false;

        this.editYearForm.controls['Year'].setValue(this.yearDetails.yearID);
        this.editYearForm.controls['Display'].setValue(this.yearDetails.display);
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

  public submitForm() {
    this.validationService.markFormGroupTouched(this.editYearForm);
    this.saveChanges(false);
  }

  public saveChanges(addMore: boolean): void {
    console.log(`Edit academic year: save changes called ${addMore}`);
    this.resetForm();

    if (!this.editYearForm.valid) {
      this.validationService.validateForm(this.editYearForm, false, true);
      return;
    }

    this.yearDetails.yearID = this.year.value;
    this.yearDetails.display = this.display.value;

    this.actionPending = true;
    this.assessmentYearService.updateAssessmentYear(this.yearDetails)
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
    this.routeConfig.navigate([`admin/settings`]);
  }

  public performDelete(): void {
    if (this.id !== null) {
      this.assessmentYearService.deleteAssessmentYear(this.id)
      .subscribe(
        r1 => {
          console.log(r1);
          if (r1.status === EnumStatusCode.Ok) {
            this.routeConfig.navigate([`admin/settings`]);
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
    this.editYearForm = this.fb.group({
      Year: ['', Required('Please enter a year value')],
      Display: ['', Required('Please enter a display name')]
    });

    this.validationService.setFormFields(this.editYearForm);

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.validationService.detectChangesInForm(this.editYearForm);
  }

}

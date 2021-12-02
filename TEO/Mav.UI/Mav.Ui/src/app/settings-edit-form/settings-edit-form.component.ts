import { Component, OnInit, Input } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { SettingViewModel } from '../models/admin/setting.view.model';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsService } from '../services/admin/settings.service';
import { FormValidationService } from '../services/form-validation.service';
import { EnumStatusCode } from '../models/generic.status';
import { Required } from '../validators/required';

@Component({
  selector: 'app-settings-edit-form',
  templateUrl: './settings-edit-form.component.html',
  styleUrls: ['./settings-edit-form.component.css']
})
export class SettingsEditFormComponent extends AppComponentBase implements OnInit {

  @Input() id: number;

  public settingDetails: SettingViewModel = new SettingViewModel();

  public editSettingForm: FormGroup;

  public get name(): AbstractControl { return this.editSettingForm.get('Name'); }
  public get dataType(): AbstractControl { return this.editSettingForm.get('DataType'); }
  public get entry(): AbstractControl { return this.editSettingForm.get('Entry'); }

  constructor(
    public routeConfig: Router,
    private settingService: SettingsService,
    private readonly fb: FormBuilder,
    public validationService: FormValidationService
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.buildForm();
    this.actionPending = true;
    this.settingService.getSettingById(this.id)
    .subscribe(
      r1 => {
        console.log(r1);
        this.settingDetails = r1;
        this.actionPending = false;

        this.editSettingForm.controls['Name'].setValue(this.settingDetails.name);
        this.editSettingForm.controls['DataType'].setValue(this.settingDetails.dataType);
        this.editSettingForm.controls['Entry'].setValue(this.settingDetails.entry);
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

  public submitForm() {
    this.validationService.markFormGroupTouched(this.editSettingForm);
    this.saveChanges(false);
  }

  public saveChanges(addMore: boolean): void {
    console.log(`Update Setting: save changes called ${addMore}`);
    this.resetForm();

    if (!this.editSettingForm.valid) {
      this.validationService.validateForm(this.editSettingForm, false, true);
      return;
    }

    this.settingDetails.entry = this.entry.value;

    this.actionPending = true;
    this.settingService.updateSetting(this.settingDetails)
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

  private buildForm(): void {
    this.editSettingForm = this.fb.group({
      Name: ['', Required('Please enter your setting name')],
      DataType: ['', Required('Please enter your setting data type')],
      Entry: ['', [Required('Please enter your setting value')]]
    });

    this.validationService.setFormFields(this.editSettingForm);

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.validationService.detectChangesInForm(this.editSettingForm);
  }

}

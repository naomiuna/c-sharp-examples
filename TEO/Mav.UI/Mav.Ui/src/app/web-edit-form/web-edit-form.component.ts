import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponentBase } from '../app.component.base';
import { PageServiceService } from '../services/admin/page-service.service';
import { FormValidationService } from '../services/form-validation.service';
import { EnumStatusCode } from '../models/generic.status';
import { Required } from '../validators/required';
import { PageViewModel } from '../models/admin/page.view.model';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { tinymceDefaultSettings } from 'angular-tinymce';
import * as TinyMce from 'tinymce';
import { environment } from '../../environments/environment';

declare function tinyImagesPicker(cb: any, value: any, meta: any): any;

@Component({
  selector: 'app-web-edit-form',
  templateUrl: './web-edit-form.component.html',
  styleUrls: ['./web-edit-form.component.css']
})
export class WebEditFormComponent extends AppComponentBase implements OnInit {

  @Input() id: number;

  public pageDetails: PageViewModel = {
    id: 0,
    typeID: 0,
    orderID: 1,
    navigationTypeID: 0,
    published: true,
    pageInfo: {
      id: 0,
      pageID: 0,
      title: '',
      url: '',
      content: '',
      modifiedOn: null
    }
  };

  public editPageForm: FormGroup;
  public isPublished: boolean;
  public customEditorSettings: TinyMce.Settings | any;

  public get title(): AbstractControl { return this.editPageForm.get('PageTitle'); }
  public get description(): AbstractControl { return this.editPageForm.get('Description'); }

  public apiBaseUrl: string;
  public authorityUrl: string;

  constructor(
    public routeConfig: Router,
    private pageService: PageServiceService,
    private readonly fb: FormBuilder,
    public validationService: FormValidationService
  ) {
    super(routeConfig);

    this.apiBaseUrl = environment.apiBase;
    this.authorityUrl = environment.authorityBase;

    this.customEditorSettings = tinymceDefaultSettings();
    this.customEditorSettings.plugins = 'lists fullscreen spellchecker code image media link';
    this.customEditorSettings.height = 450;
    this.customEditorSettings.file_picker_callback = tinyImagesPicker;
  }

  ngOnInit() {
    super.ngOnInit();
    this.buildForm();
    this.actionPending = true;
    this.pageService.getPageById<PageViewModel>(this.id)
    .subscribe(
      r1 => {
        console.log(r1);
        this.pageDetails = r1;
        this.actionPending = false;

        if (this.pageDetails != null) {
          this.editPageForm.controls['PageTitle'].setValue(this.pageDetails.pageInfo.title);
          this.editPageForm.controls['Description'].setValue(this.pageDetails.pageInfo.content);
          this.isPublished = this.pageDetails.published;
        }
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

  public submitForm() {
    this.validationService.markFormGroupTouched(this.editPageForm);
    this.saveChanges(false);
  }

  public saveChanges(addMore: boolean): void {
    console.log(`Edit Page: save changes called ${addMore}`);
    this.resetForm();

    if (!this.editPageForm.valid) {
      this.validationService.validateForm(this.editPageForm, false, true);
      return;
    }

    this.pageDetails.pageInfo.title = this.title.value;
    this.pageDetails.pageInfo.content = this.description.value;
    this.pageDetails.published = this.isPublished;

    this.actionPending = true;
    this.pageService.updatePage(this.pageDetails)
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
    this.routeConfig.navigate([`admin/web`]);
  }

  public changePublished(event: MatSlideToggleChange): void {
    console.log(`changePublished: ${event}`);
    this.isPublished = event.checked;
  }

  private buildForm(): void {
    this.editPageForm = this.fb.group({
      PageTitle: ['', Required('Please enter a page title')],
      Description: ['']
    });

    this.validationService.setFormFields(this.editPageForm);

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.validationService.detectChangesInForm(this.editPageForm);
  }

}

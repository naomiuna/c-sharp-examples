import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AppAdminAssessmentBase } from '../app.admin.assessment.base';
import { GenericEventArgs } from '../models/admin/generic-event-args';
import { Router } from '@angular/router';
import { EnumEventType } from '../models/admin/generic-event-type';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { FormValidationService } from '../services/form-validation.service';
import { QuestionGroupService } from '../services/question-group.service';
import { Required } from '../validators/required';
import { QuestionGroupViewModel } from '../models/question-group.viewmodel';
import { AddQuestionGroupViewModel } from '../models/admin/add-question-group.view.model';
import { UpdateQuestionGroupViewModel } from '../models/admin/update-question-group.view.model';
import { EnumStatusCode } from '../models/generic.status';
import * as _ from 'lodash';

declare function removeModal(modalType: string): any;

@Component({
  selector: 'app-assessments-section-edit-categories',
  templateUrl: './assessments-section-edit-categories.component.html',
  styleUrls: ['./assessments-section-edit-categories.component.css']
})
export class AssessmentsSectionEditCategoriesComponent extends AppAdminAssessmentBase implements OnInit {

  @Input() id: number; // Section ID

  @Output() sectionActionRequest: EventEmitter<GenericEventArgs>;

  private eventArgs: GenericEventArgs;

  private actionKeyID: number;

  public groupID: number;
  public crudFormTypeId = 1;
  public categoryListingActive = true;
  public categoryCrudActive = false;

  public addEditQuestionGroupForm: FormGroup;
  public addDetails: AddQuestionGroupViewModel = new AddQuestionGroupViewModel();
  public editDetails: UpdateQuestionGroupViewModel = new UpdateQuestionGroupViewModel();

  public loadingText: string;
  public questionGroupList: QuestionGroupViewModel[] = [];

  public get orderId(): AbstractControl { return this.addEditQuestionGroupForm.get('OrderId'); }
  public get title(): AbstractControl { return this.addEditQuestionGroupForm.get('Title'); }

  constructor(
    public routeConfig: Router,
    private readonly fb: FormBuilder,
    public validationService: FormValidationService,
    public questionGroupService: QuestionGroupService
  ) {
    super(routeConfig);

    this.sectionActionRequest = new EventEmitter<GenericEventArgs>();
  }

  ngOnInit() {
    super.ngOnInit();
    this.buildForm();
    this.buildListing();
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

  public cancelAddEditForm(): void {
    this.categoryListingActive = true;
    this.categoryCrudActive = false;
    this.resetAllForms();
  }

  public addQuestionGroup(): void {
    this.crudFormTypeId = 1;
    this.categoryListingActive = false;
    this.categoryCrudActive = true;
  }

  public editQuestionGroup(groupId: number): void {
    this.groupID = groupId;
    this.crudFormTypeId = 2;
    this.actionPending = true;
    this.questionGroupService.getQuestionGroupById<UpdateQuestionGroupViewModel>(this.groupID)
    .subscribe(
      r1 => {
        console.log(r1);
        this.editDetails = r1;

        this.addEditQuestionGroupForm.controls['OrderId'].setValue(this.editDetails.orderId);
        this.addEditQuestionGroupForm.controls['Title'].setValue(this.editDetails.title);
        this.actionPending = false;

        this.categoryListingActive = false;
        this.categoryCrudActive = true;
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

  public submitForm() {
    this.validationService.markFormGroupTouched(this.addEditQuestionGroupForm);
    this.saveChanges(false);
  }

  public saveChanges(addMore: boolean): void {
    console.log(`Edit Question Group: save changes called ${addMore}`);
    this.resetForm();

    if (!this.addEditQuestionGroupForm.valid) {
      this.validationService.validateForm(this.addEditQuestionGroupForm, false, true);
      return;
    }

    this.actionPending = true;
    if (this.crudFormTypeId === 1) {
      this.addDetails = new AddQuestionGroupViewModel();
      this.addDetails.orderId = this.orderId.value;
      this.addDetails.title = this.title.value;
      this.addDetails.sectionID = this.id;

      this.questionGroupService.createQuestionGroup(this.addDetails)
      .subscribe(
        r1 => {
          console.log(r1);
          this.actionPending = false;
          if (r1.status === EnumStatusCode.Ok) {
            this.updateOk = true;
            this.buildListing();
            this.cancelAddEditForm();
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
    } else {
      this.editDetails.orderId = this.orderId.value;
      this.editDetails.title = this.title.value;

      this.questionGroupService.updateQuestionGroup(this.editDetails)
      .subscribe(
        r1 => {
          console.log(r1);
          this.actionPending = false;
          if (r1.status === EnumStatusCode.Ok) {
            this.updateOk = true;
            this.buildListing();
            this.cancelAddEditForm();
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
  }

  public deleteQuestionGroup(groupID: number): void {
    this.actionKeyID = groupID;
  }

  public performDeleteQuestionGroup(): void {
    this.questionGroupService.deleteQuestionGroup(this.actionKeyID)
      .subscribe(
        r1 => {
          console.log(r1);
          if (r1.status === EnumStatusCode.Ok) {
            this.buildListing();
            this.cancelAddEditForm();
            removeModal('del_question_group_modal');
          } else {
            this.error = r1.message;
          }
        },
        (e1: Error) => {
          this.onApiError(e1.message);
        }
      );
  }

  private getMaxOrderId(): number {
    if (this.questionGroupList.length === 0) {
      return 1;
    }
    const maxRecord =  _.maxBy(this.questionGroupList, function(o) { return o.orderId; });
    if (maxRecord == null) { return 1; }

    return maxRecord.orderId + 1;
  }

  private buildListing(): void {
    this.actionPending = true;
    this.questionGroupService.getQuestionGroupList(this.id)
    .subscribe(
      r1 => {
        console.log(r1);
        this.questionGroupList = r1;
        this.actionPending = false;
        this.toggleLoadingText(this.questionGroupList.length);
        this.resetAllForms();
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

  private toggleLoadingText(max: number): void {
    if (max === -1) {
      this.loadingText = 'Loading...';
    } else if (max === 0) {
      this.loadingText = 'There are currently no categories to display.';
    } else {
      this.loadingText = '';
    }
  }

  private buildForm(): void {
    this.addEditQuestionGroupForm = this.fb.group({
      OrderId: ['', Required('Please specify category order')],
      Title: ['', Required('Please enter a category title')]
    });

    this.validationService.setFormFields(this.addEditQuestionGroupForm);

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.validationService.detectChangesInForm(this.addEditQuestionGroupForm);
  }

  private resetAllForms(): void {
    this.resetForm();

    this.addDetails.orderId = this.getMaxOrderId();
    this.addDetails.title = '';

    this.editDetails.id = 0;
    this.editDetails.orderId = 1;
    this.editDetails.title = '';

    this.addEditQuestionGroupForm.controls['OrderId'].setValue(this.addDetails.orderId);
    this.addEditQuestionGroupForm.controls['Title'].setValue(this.editDetails.title);
  }
}

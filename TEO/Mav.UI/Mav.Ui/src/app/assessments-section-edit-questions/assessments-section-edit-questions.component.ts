import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AppAdminAssessmentBase } from '../app.admin.assessment.base';
import { GenericEventArgs } from '../models/admin/generic-event-args';
import { Router } from '@angular/router';
import { EnumEventType } from '../models/admin/generic-event-type';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { FormValidationService } from '../services/form-validation.service';
import { QuestionService } from '../services/question.service';
import { Required } from '../validators/required';
import { QuestionViewModel } from '../models/question.view.model';
import { AddQuestionViewModel } from '../models/admin/add-question.view.model';
import { UpdateQuestionViewModel } from '../models/admin/update-question.view.model';
import { EnumStatusCode } from '../models/generic.status';
import * as _ from 'lodash';
import { QuestionGroupViewModel } from '../models/question-group.viewmodel';
import { QuestionGroupService } from '../services/question-group.service';
import { MatSlideToggleChange } from '@angular/material';
import { EnumQuestionType } from '../models/question.type';
import { AnswerService } from '../services/answer.service';
import { UpdateAnswerViewModel } from '../models/admin/update-answer.view.model';

declare function removeModal(modalType: string): any;

@Component({
  selector: 'app-assessments-section-edit-questions',
  templateUrl: './assessments-section-edit-questions.component.html',
  styleUrls: ['./assessments-section-edit-questions.component.css']
})
export class AssessmentsSectionEditQuestionsComponent extends AppAdminAssessmentBase implements OnInit {

  @Input() id: number; // Section ID

  @Output() sectionActionRequest: EventEmitter<GenericEventArgs>;

  private eventArgs: GenericEventArgs;

  private actionKeyID: number;
  public loadingText: string;

  // Questions
  public questionID: number;
  public crudFormTypeId = 1;
  public questionListingActive = true;
  public questionCrudActive = false;

  public addEditQuestionForm: FormGroup;
  public addDetails: AddQuestionViewModel = new AddQuestionViewModel();
  public editDetails: UpdateQuestionViewModel = new UpdateQuestionViewModel();

  public questionList: QuestionViewModel[] = [];
  public questionGroupList: QuestionGroupViewModel[] = [];
  public isMultiChoice: boolean;
  public questionActive: boolean;

  public get number(): AbstractControl { return this.addEditQuestionForm.get('Number'); }
  public get title(): AbstractControl { return this.addEditQuestionForm.get('Title'); }
  public get groupID(): AbstractControl { return this.addEditQuestionForm.get('GroupID'); }
  public get selections(): AbstractControl { return this.addEditQuestionForm.get('Selections'); }
  public get yesNoCorrectID(): AbstractControl { return this.addEditQuestionForm.get('YesNoCorrectID'); }
  public get hintText(): AbstractControl { return this.addEditQuestionForm.get('HintText'); }

  // Answers
  public crudAnswerFormTypeId = 1;
  public answerListingActive = true;
  public answerCrudActive = false;
  public addEditAnswerForm: FormGroup;

  public answerList: UpdateAnswerViewModel[] = [];
  public answerDetails: UpdateAnswerViewModel;
  public answerID: number;
  public answerIdx: number;

  public get answerOrderID(): AbstractControl { return this.addEditAnswerForm.get('OrderID'); }
  public get answerTitle(): AbstractControl { return this.addEditAnswerForm.get('Title'); }
  public answerIsCorrect: boolean;
  public answerActive: boolean;

  constructor(
    public routeConfig: Router,
    private readonly fb: FormBuilder,
    public validationService: FormValidationService,
    public questionService: QuestionService,
    public questionGroupService: QuestionGroupService,
    public answerService: AnswerService
  ) {
    super(routeConfig);

    this.sectionActionRequest = new EventEmitter<GenericEventArgs>();
  }

  ngOnInit() {
    super.ngOnInit();
    this.buildForm();
    this.buildListing();
    this.getQuestionGroupList();
    this.resetAnswerForm();
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
    this.questionListingActive = true;
    this.questionCrudActive = false;
    this.resetAllForms();
  }

  public addQuestion(): void {
    this.crudFormTypeId = 1;
    this.questionListingActive = false;
    this.questionCrudActive = true;
  }

  public editQuestion(questionId: number): void {
    this.questionID = questionId;
    this.crudFormTypeId = 2;
    this.actionPending = true;
    this.questionService.getQuestionById<UpdateQuestionViewModel>(this.questionID)
    .subscribe(
      r1 => {
        console.log(r1);
        this.editDetails = r1;

        this.addEditQuestionForm.controls['Number'].setValue(this.editDetails.number);
        this.addEditQuestionForm.controls['Title'].setValue(this.editDetails.title);
        this.addEditQuestionForm.controls['GroupID'].setValue(this.editDetails.groupID);
        this.addEditQuestionForm.controls['Selections'].setValue(this.editDetails.selections);
        this.addEditQuestionForm.controls['YesNoCorrectID'].setValue(this.editDetails.yesNoCorrectID);
        this.addEditQuestionForm.controls['HintText'].setValue(this.editDetails.hintText);
        this.isMultiChoice = this.editDetails.typeID === EnumQuestionType.Multiple;
        this.questionActive = this.editDetails.active;

        this.questionListingActive = false;
        this.questionCrudActive = true;

        this.answerService.getAnswerList(this.editDetails.id)
          .subscribe(
            r2 => {
              console.log(r2);
              this.answerList = r2;
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
    this.validationService.markFormGroupTouched(this.addEditQuestionForm);
    this.saveChanges(false);
  }

  public saveChanges(addMore: boolean): void {
    console.log(`Edit Question: save changes called ${addMore}`);
    this.resetForm();

    if (!this.addEditQuestionForm.valid) {
      this.validationService.validateForm(this.addEditQuestionForm, false, true);
      return;
    }

    this.actionPending = true;
    if (this.crudFormTypeId === 1) {
      this.addDetails = new AddQuestionViewModel();
      this.addDetails.sectionID = this.id;
      this.addDetails.number = this.number.value;
      this.addDetails.title = this.title.value;
      this.addDetails.groupID = !!this.groupID.value ? this.groupID.value : null;
      this.addDetails.typeID = this.isMultiChoice ? EnumQuestionType.Multiple : EnumQuestionType.YesNo;
      this.addDetails.selections = this.isMultiChoice ? this.selections.value : 0;
      this.addDetails.yesNoCorrectID = this.isMultiChoice ? null : this.yesNoCorrectID.value;
      this.addDetails.hintText = this.hintText.value;

      this.questionService.createQuestion(this.addDetails)
      .subscribe(
        r1 => {
          console.log(r1);
          if (r1.status === EnumStatusCode.Ok) {
            this.answerService.insertUpdateAnswer(this.setQuestionIDForAllAnswers(r1.keyID))
            .subscribe(
              r2 => {
                console.log(r2);
                this.actionPending = false;
                if (r2.status === EnumStatusCode.Ok) {
                  this.updateOk = true;
                  this.buildListing();
                  this.cancelAddEditForm();
                } else {
                  this.error = r2.message;
                }
              },
              (e2: Error) => {
                this.onApiError(e2.message);
              }
            );
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
      this.editDetails.number = this.number.value;
      this.editDetails.title = this.title.value;
      this.editDetails.groupID = !!this.groupID.value ? this.groupID.value : null;
      this.editDetails.typeID = this.isMultiChoice ? EnumQuestionType.Multiple : EnumQuestionType.YesNo;
      this.editDetails.selections = this.isMultiChoice ? this.selections.value : 0;
      this.editDetails.yesNoCorrectID = this.isMultiChoice ? null : this.yesNoCorrectID.value;
      this.editDetails.hintText = this.hintText.value;
      this.editDetails.active = this.questionActive;

      this.questionService.updateQuestion(this.editDetails)
      .subscribe(
        r1 => {
          console.log(r1);
          if (r1.status === EnumStatusCode.Ok) {
            this.answerService.insertUpdateAnswer(this.answerList)
            .subscribe(
              r2 => {
                console.log(r2);
                this.actionPending = false;
                if (r2.status === EnumStatusCode.Ok) {
                  this.updateOk = true;
                  this.buildListing();
                  this.cancelAddEditForm();
                } else {
                  this.error = r2.message;
                }
              },
              (e2: Error) => {
                this.onApiError(e2.message);
              }
            );
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

  public changeIsMultiChoice(event: MatSlideToggleChange): void {
    this.isMultiChoice = event.checked;
  }

  public changeQuestionActive(event: MatSlideToggleChange): void {
    this.questionActive = event.checked;
  }

  public deleteQuestion(questionID: number): void {
    this.actionKeyID = questionID;
  }

  public performDeleteQuestion(): void {
    this.questionService.deleteQuestion(this.actionKeyID)
      .subscribe(
        r1 => {
          console.log(r1);
          if (r1.status === EnumStatusCode.Ok) {
            this.buildListing();
            this.cancelAddEditForm();
            removeModal('question_answers_modal');
          } else {
            this.error = r1.message;
          }
        },
        (e1: Error) => {
          this.onApiError(e1.message);
        }
      );
  }

  public cancelAddEditAnswerForm(): void {
    this.answerListingActive = true;
    this.answerCrudActive = false;
    this.resetAnswerForm();
  }

  public addAnswer(): void {
    this.crudAnswerFormTypeId = 1;
    this.answerListingActive = false;
    this.answerCrudActive = true;
    this.resetAnswerForm();
  }

  public editAnswer(indexId: number): void {
    this.crudAnswerFormTypeId = 2;
    this.setAnswerDetailsByIdx(indexId);

    this.answerIsCorrect = this.answerDetails.isCorrect;
    this.answerActive = this.answerDetails.active;

    this.addEditAnswerForm.controls['OrderID'].setValue(this.answerDetails.orderID);
    this.addEditAnswerForm.controls['Title'].setValue(this.answerDetails.title);

    this.answerListingActive = false;
    this.answerCrudActive = true;
  }

  public deleteAnswer(indexId: number): void {
    console.log(`deleteAnswer: ${indexId}`);
    this.setAnswerDetailsByIdx(indexId);
    this.answerDetails.deleted = true;
    this.saveAnswerDetails();
  }

  public submitAnswerForm() {
    this.validationService.markFormGroupTouched(this.addEditAnswerForm);
    this.saveAnswerChanges(false);
  }

  public saveAnswerChanges(addMore: boolean): void {
    console.log(`Edit Answer: save changes called ${addMore}`);
    this.resetForm();

    if (!this.addEditAnswerForm.valid) {
      this.validationService.validateForm(this.addEditAnswerForm, false, true);
      return;
    }

    this.actionPending = true;

    this.answerDetails.orderID = this.answerOrderID.value;
    this.answerDetails.title = this.answerTitle.value;
    this.answerDetails.active = this.answerActive;
    this.answerDetails.isCorrect = this.answerIsCorrect;

    if (this.crudFormTypeId === 1) {
      this.saveAnswerDetails();
    } else {
      this.saveAnswerDetails();
    }

    this.cancelAddEditAnswerForm();
  }

  public changeAnswerIsCorrect(event: MatSlideToggleChange): void {
    this.answerIsCorrect = event.checked;
  }

  public changeAnswerActive(event: MatSlideToggleChange): void {
    this.answerActive = event.checked;
  }

  public trackByAnswerIdx(index, item) {
    return index;
  }

  private getMaxOrderId(): number {
    if (this.questionList.length === 0) {
      return 1;
    }
    const maxRecord =  _.maxBy(this.questionList, function(o) { return o.number; });
    if (maxRecord == null) { return 1; }

    return maxRecord.number + 1;
  }

  private buildListing(): void {
    this.actionPending = true;
    this.questionService.getQuestionList(this.id)
    .subscribe(
      r1 => {
        console.log(r1);
        this.questionList = r1;
        this.actionPending = false;
        this.toggleLoadingText(this.questionList.length);
        this.resetAllForms();
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

  private getQuestionGroupList(): void {
    this.actionPending = true;
    this.questionGroupService.getQuestionGroupList(this.id)
    .subscribe(
      r1 => {
        this.questionGroupList = r1;
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
      this.loadingText = 'There are currently no questions to display.';
    } else {
      this.loadingText = '';
    }
  }

  private buildForm(): void {
    this.addEditQuestionForm = this.fb.group({
      Number: ['', Required('Please specify question number')],
      Title: ['', Required('Please enter a question title')],
      GroupID: [''],
      Selections: [''],
      YesNoCorrectID: [''],
      HintText: ['']
    });

    this.addEditAnswerForm = this.fb.group({
      OrderID: ['', Required('Please specify answer ordering')],
      Title: ['', Required('Please enter a answer title')]
    });

    this.validationService.setFormFields(this.addEditQuestionForm);
    this.validationService.setFormFields(this.addEditAnswerForm);

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.validationService.detectChangesInForm(this.addEditQuestionForm);
    this.validationService.detectChangesInForm(this.addEditAnswerForm);
  }

  private resetAllForms(): void {
    this.resetForm();

    this.addDetails.number = this.getMaxOrderId();
    this.addDetails.title = '';
    this.addDetails.groupID = null;
    this.addDetails.typeID = EnumQuestionType.YesNo;
    this.addDetails.selections = 0;
    this.addDetails.yesNoCorrectID = 0;
    this.addDetails.hintText = '';

    this.editDetails.id = 0;
    this.editDetails.number = 1;
    this.editDetails.groupID = null;
    this.editDetails.typeID = EnumQuestionType.YesNo;
    this.editDetails.selections = 0;
    this.editDetails.yesNoCorrectID = 0;
    this.editDetails.hintText = '';

    this.isMultiChoice = false;

    this.addEditQuestionForm.controls['Number'].setValue(this.addDetails.number);
    this.addEditQuestionForm.controls['Title'].setValue(this.addDetails.title);
    this.addEditQuestionForm.controls['GroupID'].setValue(this.addDetails.groupID);
    this.addEditQuestionForm.controls['Selections'].setValue(this.addDetails.selections);
    this.addEditQuestionForm.controls['YesNoCorrectID'].setValue(this.addDetails.yesNoCorrectID);
    this.addEditQuestionForm.controls['HintText'].setValue(this.addDetails.hintText);

    this.answerList = [];
    this.resetAnswerForm();
  }

  private setAnswerDetailsByIdx(indexId: number): void {
    this.answerIdx = indexId;
    this.answerDetails = this.answerList[this.answerIdx];
  }

  private setAnswerDetailsById(answerID: number) {
    this.answerIdx = _.findIndex(this.answerList, function(o) { return o.id === answerID; });
    this.answerDetails = this.answerList[this.answerIdx];
  }

  private saveAnswerDetails(): void {
    if (this.answerIdx >= 0 && this.answerIdx <= this.answerList.length - 1) {
      this.answerList.splice(this.answerIdx, 1, this.answerDetails);
    } else {
      this.answerList.push(this.answerDetails);
    }
    _.orderBy(this.answerList, ['orderID'], ['asc']);
  }

  private setQuestionIDForAllAnswers(qid: number): UpdateAnswerViewModel[] {
    const transferAnswerList: UpdateAnswerViewModel[] = [];
    _.forEach(this.answerList, function(ansVal) {
      ansVal.questionID = qid;
      transferAnswerList.push(ansVal);
    });
    return transferAnswerList;
  }

  private getMaxAnswerOrderId(): number {
    if (this.answerList.length === 0) {
      return 1;
    }
    const maxRecord =  _.maxBy(this.answerList, function(o) { return o.orderID; });
    if (maxRecord == null) { return 1; }

    return maxRecord.orderID + 1;
  }

  private resetAnswerForm(): void {
    this.answerDetails = new UpdateAnswerViewModel();
    this.answerDetails.id = 0;
    this.answerDetails.questionID = this.questionID;
    this.answerDetails.deleted = false;
    this.answerDetails.orderID = this.getMaxAnswerOrderId();
    this.answerDetails.isCorrect = false;
    this.answerDetails.active = true;
    this.answerDetails.title = '';

    this.answerIsCorrect = false;
    this.answerActive = true;

    this.addEditAnswerForm.controls['OrderID'].setValue(this.answerDetails.orderID);
    this.addEditAnswerForm.controls['Title'].setValue(this.answerDetails.title);

    this.answerID = 0;
    this.answerIdx = -1;

    this.actionPending = false;
    removeModal('question_answers_modal');
  }

}

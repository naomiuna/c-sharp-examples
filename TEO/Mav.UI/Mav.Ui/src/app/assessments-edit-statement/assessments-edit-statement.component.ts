import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidationService } from '../services/form-validation.service';
import { tinymceDefaultSettings } from 'angular-tinymce';
import * as TinyMce from 'tinymce';
import { AppAdminAssessmentBase } from '../app.admin.assessment.base';
import { GenericEventArgs } from '../models/admin/generic-event-args';
import { EnumEventType } from '../models/admin/generic-event-type';
import { UpdateStatementViewModel } from '../models/admin/update-statement.view.model';
import { StatementQuestionViewModel } from '../models/admin/statement-question.view.model'
import { SectionService } from '../services/section.service';
import { StatementService } from '../services/statement.service';
import { MatSlideToggleChange } from '@angular/material';
import { EnumStatusCode } from '../models/generic.status';
import { EnumStatementType } from '../models/statement.type'
import { Required } from '../validators/required';
import { environment } from '../../environments/environment';

declare function tinyImagesPicker(cb: any, value: any, meta: any): any;

@Component({
  selector: 'app-assessments-edit-statement',
  templateUrl: './assessments-edit-statement.component.html',
  styleUrls: ['./assessments-edit-statement.component.css']
})
export class AssessmentsEditStatementComponent extends AppAdminAssessmentBase implements OnInit {

  @Input() id: number; // Section ID

  @Output() sectionActionRequest: EventEmitter<GenericEventArgs>;

  private eventArgs: GenericEventArgs;

  public statementDetails: UpdateStatementViewModel = new UpdateStatementViewModel();
  public questionList: StatementQuestionViewModel[] = [];
  public addQuestionActive: boolean;
  public addQuestionCrudType: number;
  public selectedQuestion: StatementQuestionViewModel;
  public questionActive: boolean;

  public editSectionStatementForm: FormGroup;
  public addSectionStatementQuestionForm: FormGroup;
  public customEditorSettings: TinyMce.Settings | any;

  public get number(): AbstractControl { return this.editSectionStatementForm.get('Number'); }
  public get content(): AbstractControl { return this.editSectionStatementForm.get('Content'); }

  public get title(): AbstractControl { return this.addSectionStatementQuestionForm.get('Title'); }

  public apiBaseUrl: string;
  public authorityUrl: string;

  constructor(
    public routeConfig: Router,
    private readonly fb: FormBuilder,
    public validationService: FormValidationService,
    public statementService: StatementService
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

    this.statementService.getStatementByAssessmentId<UpdateStatementViewModel>(this.id)

      .subscribe(
        r1 => {
          console.log("Statement", r1);

          if (r1) {
            //data returned, update existing, otherwise we'll create a new Statement
            this.statementDetails = r1;
            this.questionList = this.statementDetails.questions;
            this.editSectionStatementForm.controls['Number'].setValue(this.statementDetails.number);
            this.editSectionStatementForm.controls['Content'].setValue(this.statementDetails.content);
          }

          this.statementDetails.parentID = this.id;
          this.statementDetails.statementType = EnumStatementType.Assessment;
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
    this.routeConfig.navigate([`admin/assessments`]);
  }

  // public changeIsRandom(event: MatSlideToggleChange): void {
  //   this.isRandom = event.checked;
  //   if (!this.isRandom) {
  //     this.sectionDetails.quantity = 0;
  //     this.editSectionStatementForm.controls['Quantity'].setValue(this.sectionDetails.quantity);
  //   }
  // }

  public submitForm() {
    this.validationService.markFormGroupTouched(this.editSectionStatementForm);
    this.saveChanges(false);
  }

  public submitQuestionForm() {
    this.validationService.markFormGroupTouched(this.addSectionStatementQuestionForm);
    this.saveQuestion();
  }

  public saveChanges(addMore: boolean): void {
    console.log(`Edit Section: save changes called ${addMore}`);
    this.resetForm();

    if (!this.editSectionStatementForm.valid) {
      this.validationService.validateForm(this.editSectionStatementForm, false, true);
      return;
    }

    this.statementDetails.parentID = this.id;
    this.statementDetails.number = this.number.value;
    this.statementDetails.content = this.content.value;
    this.statementDetails.statementType = EnumStatementType.Assessment;
    this.statementDetails.questions = this.questionList;

    if (this.statementDetails.id) {
      this.update();
    } else {
      this.create();
    }
  }

  public saveQuestion() {
    this.resetForm();

    if (!this.addSectionStatementQuestionForm.valid) {
      this.validationService.validateForm(this.addSectionStatementQuestionForm, false, true);
      return;
    }


    if (this.addQuestionCrudType === 2) {

      this.selectedQuestion.title = this.title.value;
      this.selectedQuestion.active = this.questionActive;
    } else {
      var question = new StatementQuestionViewModel();
      question.id = -1;
      question.title = this.title.value;
      question.active = this.questionActive;

      this.questionList.push(question);

    }



    this.addQuestionActive = false;

  }

  private create() {
    this.actionPending = true;
    this.statementDetails.questions = this.questionList;
    this.statementService.createStatement(this.statementDetails)
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

  private update() {
    this.actionPending = true;
    this.statementDetails.questions = this.questionList;
    this.statementService.updateStatement(this.statementDetails)
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

  public addQuestion() {
    this.addQuestionActive = true;
    this.addQuestionCrudType = 1; //create

    this.addSectionStatementQuestionForm.controls['Title'].setValue('');
    this.questionActive = true;
  }

  public editQuestion(question) {
    this.addQuestionActive = true;
    this.addQuestionCrudType = 2; //update
    this.selectedQuestion = question;

    this.addSectionStatementQuestionForm.controls['Title'].setValue(question.title);
    this.questionActive = question.active;
  }

  public changeQuestionActive(event: MatSlideToggleChange): void {
    this.questionActive = event.checked;
  }

  public deleteQuestion(index) {
    delete this.questionList[index];
    //filter undefined item
    this.questionList = this.questionList.filter(item => item !== undefined);
  }

  public cancelQuestion(){
    this.addQuestionActive = false;
  }

  private buildForm(): void {
    this.editSectionStatementForm = this.fb.group({
      Number: ['', Required('Please enter a statement number')],
      Content: ['', Required('Please enter a statement')],
      // Reference: ['', Required('Please enter a section reference')],
      // IsRandom: [''],
      // Quantity: [''],
      //Information: ['']
    });


    this.validationService.setFormFields(this.editSectionStatementForm);

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.validationService.detectChangesInForm(this.editSectionStatementForm);

    this.addSectionStatementQuestionForm = this.fb.group({
      Title: ['', Required('Please enter a question')],
      Active: [true]
    })

    this.validationService.setFormFields(this.editSectionStatementForm);
    this.validationService.detectChangesInForm(this.editSectionStatementForm);

  }

}

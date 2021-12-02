import { Component, OnInit, HostListener } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router, ActivatedRoute } from '@angular/router';
import { UserAssessmentSectionService } from '../services/user-assessment-section.service';
import { AssignQuestionItem } from '../models/assign.question.item';
import { UserAssessmentSectionViewModel } from '../models/user.assessment.section.view.model';
import { ExamServiceService } from '../services/exam-service.service';
import { SectionService } from '../services/section.service';
import { ExamQuestionViewModel } from '../models/exam-question.view.model';
import { EnumQuestionType } from '../models/question.type';
import { AddUserAssessmentSectionAnswerViewModel } from '../models/add.user.assessment.section.answer.view.model';
import { UserAssessmentAnswerService } from '../services/user-assessment-answer.service';
import { EnumStatusCode } from '../models/generic.status';
import { SubmitUserAssessmentSectionViewModel } from '../models/submit.user.assessment.section.view.model';
import * as _ from 'lodash';
import { UpdateSectionViewModel } from '../models/admin/update-section.view.model';
import { UpdateUserSectionStatsViewModel } from '../models/update-user-section-stats.view.model';

@Component({
  selector: 'app-user-assessment-section-questions',
  templateUrl: './user-assessment-section-questions.component.html',
  styleUrls: ['./user-assessment-section-questions.component.css']
})
export class UserAssessmentSectionQuestionsComponent extends AppComponentBase implements OnInit {

  public id: number; // UserAssessmentSectionID

  public userAssessmentSectionDetails: UserAssessmentSectionViewModel = new UserAssessmentSectionViewModel();
  public sectionDetails: UpdateSectionViewModel = new UpdateSectionViewModel();
  public questionSelections: AssignQuestionItem[] = [];
  public questionDetails: ExamQuestionViewModel = new ExamQuestionViewModel();
  public questionIdx = 0;
  public questionId = 0;

  public timeLimit;
  public timePassed;
  public userSecTimeLimit: number;
  public userSecTimePassed: number;

  public isModalOpen = false;
  public isMultipleGuess = false;
  public maxSelections = 1;
  public answerViewModel: AddUserAssessmentSectionAnswerViewModel = new AddUserAssessmentSectionAnswerViewModel();

  public userSectionStats: UpdateUserSectionStatsViewModel = new UpdateUserSectionStatsViewModel();

  constructor(
    public routeConfig: Router,
    private activeRoute: ActivatedRoute,
    private userAssessmentSectionService: UserAssessmentSectionService,
    private userAssessmentAnswerService: UserAssessmentAnswerService,
    private examService: ExamServiceService,
    private sectionService: SectionService,
    
  ) {
    super(routeConfig);
  //   window.addEventListener("beforeunload", (event) => {
  //     // alert("test");
  //     event.preventDefault();
  //     event.returnValue = "Are you sure you want to leave? ";
  //     // var test = document.getElementById("confirmLeaveModal");
  //     // test.style.display = "block";
  //     // return event;
  //  });
  }

  ngOnInit() {
    super.ngOnInit();
    const routeParams = this.activeRoute.snapshot.params;
    this.id = routeParams.id;
    this.actionPending = true;
    this.userAssessmentSectionService.getUserAssessmentSectionById<UserAssessmentSectionViewModel>(this.id)
    .subscribe(
      r1 => {
        console.log(r1);
        this.userAssessmentSectionDetails = r1;
        if(r1.userSectionTimer !== null)
        {
          // convert minutes to seconds
          this.userSecTimeLimit = r1.userSectionTimer.timeLimit;
          this.userSecTimePassed = r1.userSectionTimer.timePassed;
        }
        this.userAssessmentSectionService.getUserAssessmentSectionQuestions(this.id)
        .subscribe(
          r2 => {
            console.log(r2);
            this.questionSelections = r2;
            this.goToQuestion(this.questionIdx);

            this.sectionService.getSectionById<UpdateSectionViewModel>(r1.sectionID).subscribe(r3 => {
                this.sectionDetails = r3;
            }, 
            (e3: Error) => {
              this.onApiError(e3.message);
            })

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
  
  public setSingleAnswer(answer: number): void {
    this.answerViewModel.answerID = answer;
  }

  public setMultiAnswer(answer: number): void {
    if (!this.isSelectedMultiAnswer(answer)) {
      this.answerViewModel.answerIDs.push(answer);
    } else {
      this.answerViewModel.answerIDs.splice(_.indexOf(this.answerViewModel.answerIDs, answer), 1);
    }
  }

  public isSelectedMultiAnswer(answer: number): boolean {
    return _.indexOf(this.answerViewModel.answerIDs, answer) > -1;
  }

  public saveAnswer(): void {
    if (this.isMultipleGuess) {
      if (this.answerViewModel.answerIDs.length === 0) { return; }
    } else {
      if (this.answerViewModel.answerID === null) { return; }
    }

    this.actionPending = true;
    this.userAssessmentAnswerService.createUserAssessmentSectionAnswer(this.answerViewModel)
    .subscribe(
      r1 => {
        console.log(r1);
        this.actionPending = false;
        if (r1.status === EnumStatusCode.Ok) {
          this.questionIdx++;
          this.goToQuestion(this.questionIdx);
        }
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

  public goToAssessmentDetails(): void {
    this.routeConfig.navigate([`/user-assessment-details/${this.userAssessmentSectionDetails.userAssessmentID}`]);
  }

  public goToSectionDetails(): void {
    this.routeConfig.navigate([`/user-assessment-section-intro/${this.id}`]);
  }

  private goToQuestion(idx: number): void {
    const questionCount = this.questionSelections.length - 1;
    if (idx > questionCount) {
      // End of assessment
      // Update UserAssessmentSection (passed?)
      this.actionPending = true;
      const submitModel: SubmitUserAssessmentSectionViewModel = new SubmitUserAssessmentSectionViewModel();
      submitModel.id = this.id;
      if(this.sectionDetails.isEoQualification)
      {
        submitModel.timePassed = this.timePassed;
      }
      this.userAssessmentSectionService.submitUserAssessmentSection(submitModel)
      .subscribe(
        r1 => {
          if (r1.status === EnumStatusCode.Ok) {
            //IF LAST QUESTION, MODAL WONT POP UP
            this.isModalOpen = true;
            // Go to section summary view
            this.routeConfig.navigate([`user-assessment-section-summary/${this.id}`]);
            return;
          }
        },
        (e1: Error) => {
          this.onApiError(e1.message);
        }
      );
    } else {
      this.questionId = this.questionSelections[idx].questionID;
      this.renderQuestion(this.questionId);
    }
  }

  private renderQuestion(qid: number): void {
    this.actionPending = true;
    this.examService.getExamQuestionById<ExamQuestionViewModel>(qid)
    .subscribe(
      r1 => {
        console.log(r1);
        this.questionDetails = r1;
        this.isMultipleGuess = this.questionDetails.typeID === EnumQuestionType.Multiple;
        this.maxSelections = 1;
        if (this.isMultipleGuess) {
          this.maxSelections = this.questionDetails.selections;
        }
        this.resetAnswerViewModel();
        this.actionPending = false;
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

  private resetAnswerViewModel(): void {
    this.answerViewModel.userAssessmentSectionID = this.id;
    this.answerViewModel.questionID = this.questionDetails.id;
    this.answerViewModel.correct = 0;
    this.answerViewModel.answerIDs = [];
    this.answerViewModel.answerID = null;
    this.answerViewModel.answerAsString = '';
  }

  public getTimerData(event):void {
    this.timeLimit = event.timeLimit;
    this.timePassed = event.timePassed;
  }

  canDeactivate() {
    if(!this.isModalOpen) {
      if (window.confirm("Are you sure you want to leave this page? If so, your time will be paused and an attempt will be recorded.")) 
      {
        this.userSectionStats.userAssessmentSectionId = this.id;
        this.userSectionStats.timePassed = this.timePassed;
        //API CALL NEEDED HERE FOR LEAVE OF PAGE. THINK THREE VARIABLES BELOW IS ALL THAT IS NEEDED.
        this.userAssessmentSectionService.updateUserSectionStats(this.userSectionStats)
        .subscribe(
          r1 => {
            console.log(r1);
            this.actionPending = false;
          },
          (e1: Error) => {
            this.onApiError(e1.message);
          }
        )
        //alert(this.id + " " + this.timeLimit + " " + this.timePassed);
      } 
      else {
        return false;
      }
    }
    return true;
  }

  public timerEnded() {
    const submitModel: SubmitUserAssessmentSectionViewModel = new SubmitUserAssessmentSectionViewModel();
    submitModel.id = this.id;
    if(this.sectionDetails.isEoQualification)
    {
      submitModel.timePassed = this.timePassed;
    }
    this.userAssessmentSectionService.submitUserAssessmentSection(submitModel)
      .subscribe(
        r1 => {
          if (r1.status === EnumStatusCode.Ok) {
            //IF LAST QUESTION, MODAL WONT POP UP
            this.isModalOpen = true;
            // Go to section summary view
            this.routeConfig.navigate([`user-assessment-section-summary/${this.id}`]);
            return;
          }
        },
        (e1: Error) => {
          this.onApiError(e1.message);
        }
      );
  }
}

// if(!this.isModalOpen) {
    //   var openModal = document.getElementById("confirmLeaveModal");
    //   return openModal.style.display = "block";
    // }

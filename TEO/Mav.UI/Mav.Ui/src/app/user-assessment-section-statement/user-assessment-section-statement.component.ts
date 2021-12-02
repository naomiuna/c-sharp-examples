import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router, ActivatedRoute } from '@angular/router';
import { UserAssessmentSectionViewModel } from '../models/user.assessment.section.view.model';
import { UpdateSectionViewModel } from '../models/admin/update-section.view.model';
import { UserAssessmentSectionService } from '../services/user-assessment-section.service';
import { SectionService } from '../services/section.service';
import { StatementService } from '../services/statement.service'
import { EnumAssessmentSectionStatus } from '../models/assessment-section.status';
import { UpdateStatementViewModel } from '../models/admin/update-statement.view.model';
import { StatementAnswerViewModel } from '../models/statement.answer.view.model';

@Component({
  selector: 'app-user-assessment-section-statement',
  templateUrl: './user-assessment-section-statement.component.html',
  styleUrls: ['./user-assessment-section-statement.component.css']
})
export class UserAssessmentSectionStatementComponent extends AppComponentBase implements OnInit {

  public id: number; // UserAssessmentSectionID

  public userAssessmentSection: UserAssessmentSectionViewModel;
  public statement: UpdateStatementViewModel;
  public sectionDetails: UpdateSectionViewModel = new UpdateSectionViewModel();
  public isDirty: boolean = false;

  constructor(
    public routeConfig: Router,
    private activeRoute: ActivatedRoute,
    private userAssessmentSectionService: UserAssessmentSectionService,
    private sectionService: SectionService,
    private statementService: StatementService
  ) {
    super(routeConfig);
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
        this.userAssessmentSection = r1;
        if (!!this.userAssessmentSection.id && this.userAssessmentSection.id > 0) {

          //get statement
          this.statementService.getStatementBySectionId<UpdateStatementViewModel>(this.userAssessmentSection.sectionID)
          .subscribe(
            r2 => {
              console.log(r2);
              this.statement = r2;

              if (!this.statement.answers){
                this.statement.answers = []
              }

              this.statement.questions.forEach(question => {
                
                //check if answer is present already
                var existingAnswer = null;
                this.statement.answers.forEach(answer => {
                  if (answer.questionID === question.id){
                    existingAnswer = answer;
                  }
                })

                if (existingAnswer){
                  existingAnswer.question = question;
                } else {
                  this.statement.answers.push({
                    id: 0,
                    statementID : this.statement.id,
                    questionID : question.id,
                    answer : "no",
                    question: question
                  })
                }
                
              });

              if (this.statement.id === null || this.statement.id === 0) {
                this.routeConfig.navigate(['/']);
              }
            },
            (e2: Error) => {
              this.onApiError(e2.message);
            }
          );

          //get section
          this.sectionService.getSectionById<UpdateSectionViewModel>(this.userAssessmentSection.sectionID)
          .subscribe(
            r2 => {
              console.log(r2);
              this.sectionDetails = r2;
              this.actionPending = false;
              if (this.sectionDetails.id === null || this.sectionDetails.id === 0) {
                this.routeConfig.navigate(['/']);
              }
            },
            (e2: Error) => {
              this.onApiError(e2.message);
            }
          );

        }
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

  public updateAnswer(questionId, value){

      console.log(questionId, value);

      this.statement.answers.forEach(answer => {
        if (answer.questionID == questionId){
          console.log("FOUND");
          answer.answer = value;
        }
      })
  }

  public goToAssessmentDetails(): void {
    this.routeConfig.navigate([`/user-assessment-details/${this.userAssessmentSection.userAssessmentID}`]);
  }

  public goToAssessmentQuestions(): void {

    this.isDirty = true;

    var valid = true;
    this.statement.answers.forEach(answer => {
      if (answer.answer == "no"){
        valid = false;
        console.log("INVALID");
      }
    })

    if (valid){
      this.actionPending = true;
      this.statementService.updateUserStatementAnswers(this.statement)
          .subscribe(
            r2 => {
              console.log(r2);
              this.actionPending = false;
              this.routeConfig.navigate([`/user-assessment-section-questions/${this.id}`]);
            },
            (e2: Error) => {
              this.onApiError(e2.message);
            }
          );
    }
      
  }

  public printStatement():void{
    let divToPrint = document.getElementById('statement__frame').innerHTML;
    let newWindow = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    newWindow.document.open();
    newWindow.document.write(`
    <html>
        <head>
          <style>
          body{
            font-family: Arial, Helvetica, sans-serif;
          }      
          .no__print, .btn {
            display:none;
          }   
          
          .button__active{
            display:inline-block;
          }

          </style>
        </head>
        <body onload="window.print();window.close()">${divToPrint}   
        </body>
      </html>
    `);
    newWindow.document.close();
  }

}

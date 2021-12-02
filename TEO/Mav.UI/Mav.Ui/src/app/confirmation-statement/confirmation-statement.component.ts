import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SectionService } from '../services/section.service';
import { StatementService } from '../services/statement.service'
import { EnumAssessmentSectionStatus } from '../models/assessment-section.status';
import { UpdateStatementViewModel } from '../models/admin/update-statement.view.model';
import { StatementAnswerViewModel } from '../models/statement.answer.view.model';
import { AppComponentBase } from '../app.component.base';

@Component({
  selector: 'app-confirmation-statement',
  templateUrl: './confirmation-statement.component.html',
  styleUrls: ['./confirmation-statement.component.css']
})
export class ConfirmationStatementComponent extends AppComponentBase implements OnInit {

@Input() statementID: number;
@Input() userID: string;

public statement : UpdateStatementViewModel = new UpdateStatementViewModel();

constructor(
  public routeConfig: Router,
  private StatmentService: StatementService
) {
  super(routeConfig);
}

  ngOnInit() {
    this.getStatement();
  }

  public getStatement():void{

    this.actionPending = true;
    this.StatmentService.getStatementById<UpdateStatementViewModel>(this.statementID)
    .subscribe(
      r1 => {
        this.statement = r1;
        console.log("STATEMENT", this.statement);
       console.log(r1);
        this.StatmentService.getUserStatementAnswers<StatementAnswerViewModel[]>(this.statementID, this.userID).subscribe(r2 => {
          console.log(r2);
          this.actionPending = false;

          if (!this.statement.answers){
            this.statement.answers = []
          }

          this.statement.answers = r2;

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

        },
        e2 => {
          console.log(e2);
          this.actionPending = false;
          this.error = `An unexpected error has occurred`;
        })

      },
      e1 => {
        console.log(e1);
        this.actionPending = false;
        this.error = `An unexpected error has occurred`;
      }
    );

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
          </style>
        </head>
        <body onload="window.print();window.close()">${divToPrint}   
        </body>
      </html>
    `);
    newWindow.document.close();
  }
}

import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router } from '@angular/router';
import { AssessmentYearViewModel } from '../models/admin/assessment-year.view.model';
import { AssessmentYearService } from '../services/admin/assessment-year.service';

@Component({
  selector: 'app-settings-years-list',
  templateUrl: './settings-years-list.component.html',
  styleUrls: ['./settings-years-list.component.css']
})
export class SettingsYearsListComponent extends AppComponentBase implements OnInit {

  public searchModel: AssessmentYearViewModel[];
  public loadingText: string;

  constructor(
    public routeConfig: Router,
    private assessmentYearService: AssessmentYearService
  ) {
    super(routeConfig);
    this.searchModel = [];
  }

  ngOnInit() {
    super.ngOnInit();
    this.searchRecords();
  }

  private searchRecords(): void {
    this.toggleLoadingText(-1);
    this.actionPending = true;

    this.assessmentYearService.getAssessmentYearList()
    .subscribe(
      r1 => {
        this.actionPending = false;
        this.searchModel = r1;
        this.toggleLoadingText(this.searchModel.length);
      },
      e1 => {
        console.log(e1);
        this.actionPending = false;
        this.error = `An unexpected error has occurred`;
      }
    );
  }

  private toggleLoadingText(max: number): void {
    if (max === -1) {
      this.loadingText = 'Loading...';
    } else if (max === 0) {
      this.loadingText = 'There are currently no records to display.';
    } else {
      this.loadingText = '';
    }
  }

}

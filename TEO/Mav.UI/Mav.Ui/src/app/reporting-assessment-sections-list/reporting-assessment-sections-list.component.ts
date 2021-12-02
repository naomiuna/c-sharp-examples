import { Component, OnInit, Input } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router } from '@angular/router';
import { ReportingService } from '../services/admin/reporting.service';
import { AssessmentSectionReportModel } from '../models/reporting/assessment.section.report.model';
import { AssessmentSectionSearchModel } from '../models/reporting/assessment.section.search.model';
import * as _ from 'lodash';
import { SectionListingModel } from '../models/search/section.listing.model';
import { SectionReportModel } from '../models/reporting/section.report.model';
import { SectionSearchModel } from '../models/search/section.search.model';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-reporting-assessment-sections-list',
  templateUrl: './reporting-assessment-sections-list.component.html',
  styleUrls: ['./reporting-assessment-sections-list.component.css']
})
export class ReportingAssessmentSectionsListComponent extends AppComponentBase implements OnInit {

  @Input() id: number; // assessment ID

  public filterModel: AssessmentSectionSearchModel = new AssessmentSectionSearchModel();
  public searchModel: AssessmentSectionReportModel[] = [];

  public submitting: boolean = false;
  public loadingText: string;
  public count: number;

  constructor(
    public routeConfig: Router,
    private reportingService: ReportingService,
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.resetSearch();
    this.searchRecords();
  }

  public newSearch(searchTerms: HTMLInputElement): void {
    this.filterModel.searchTerm = searchTerms.value;
    this.searchRecords();
  }

  public setOrder(entry): void {
    this.filterModel.orderID = entry;
  }

  private searchRecords(): void {
    this.toggleLoadingText(-1);
    this.actionPending = true;

    console.log(this.filterModel);

    this.reportingService.getAssessmentSectionReport(this.filterModel)
    .subscribe(
      r1 => {
        this.actionPending = false;
        this.searchModel = r1;
        this.count = 0;
        for(var i = 0; i < this.searchModel.length; i++)
        {
          this.count++;
        }
        this.toggleLoadingText(this.count);
      },
      e1 => {
        console.log(e1);
        this.actionPending = false;
        this.error = `An unexpected error has occurred`;
      }
    );
  }

  private resetSearch(): void {
    this.filterModel.searchTerm = '';
    this.filterModel.orderID = 1;
    this.filterModel.assessmentID = this.id;
  }

  downloadCsv() {
    this.submitting = true;
    this.reportingService.getAssessmentSectionReportCsvAll(this.filterModel)
    .subscribe (
      r1 => {
        this.actionPending = false;
        var data = new Blob([r1.csv], {type: "text/csv"});
        saveAs(data, r1.fileName);
        console.log(r1.fileName);
        this.submitting = false;
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    )
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

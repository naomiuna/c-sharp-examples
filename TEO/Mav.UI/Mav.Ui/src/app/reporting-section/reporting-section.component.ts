import { Component, OnInit, Input } from '@angular/core';
import { SectionReportModel } from '../models/reporting/section.report.model';
import { SectionSearchModel } from '../models/search/section.search.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportingService } from '../services/admin/reporting.service';
import { AppComponentBase } from '../app.component.base';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-reporting-section',
  templateUrl: './reporting-section.component.html',
  styleUrls: ['./reporting-section.component.css']
})
export class ReportingSectionComponent extends AppComponentBase implements OnInit {

  public sectionId: number;
  public sectionFilterModel: SectionSearchModel = new SectionSearchModel();
  public sectionModel: SectionReportModel[] = [];

  public submitting: boolean = false;
  public loadingText: string;
  public count: number;

  constructor(
    public routeConfig: Router,
    private activeRoute: ActivatedRoute,
    private reportingService: ReportingService
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    const routeParams = this.activeRoute.snapshot.params;
    this.sectionId = routeParams.id;
    this.toggleLoadingText(-1);

    this.sectionFilterModel.sectionId = this.sectionId;
    this.reportingService.getSectionReport(this.sectionFilterModel)
    .subscribe(
      r1 => {
        this.actionPending = false;
        this.sectionModel = r1;
        console.log(this.sectionModel);
        this.count = 0;
        for(var i = 0; i < this.sectionModel.length; i++)
        {
          this.count++;
        }
        this.toggleLoadingText(this.count);
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    )
  }

  // could get the assessment ID by calling into the API with the section ID 
  // and returning the assessment ID connected to the section

  downloadCsv() {
    this.submitting = true;
    this.reportingService.getSectionReportCsvAll(this.sectionFilterModel)
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

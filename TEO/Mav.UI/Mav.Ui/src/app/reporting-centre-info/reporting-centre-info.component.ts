import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '../app.component.base';
import { ReportingService } from '../services/admin/reporting.service';
import { CentreSearchModel } from '../models/search/centre.search.model';
import { CentreReportModel } from '../models/reporting/centre.report.model';

@Component({
  selector: 'app-reporting-centre-info',
  templateUrl: './reporting-centre-info.component.html',
  styleUrls: ['./reporting-centre-info.component.css']
})
export class ReportingCentreInfoComponent extends AppComponentBase implements OnInit {

  public centreId: number;
  public centreFilterModel: CentreSearchModel = new CentreSearchModel();
  public centreModel: CentreReportModel = new CentreReportModel;

  constructor(
    public routeConfig: Router,
    private activeRoute: ActivatedRoute,
    private reportingService: ReportingService
  ) 
  { 
    super(routeConfig);
  }

  ngOnInit() {

    const routeParams = this.activeRoute.snapshot.params;
    this.centreId = routeParams.id;

    this.centreFilterModel.centreId = this.centreId;
    this.reportingService.getCentreReport(this.centreFilterModel)
    .subscribe(
      r1 => {
        this.actionPending = false;
        this.centreModel = r1;
        console.log(this.centreModel);
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    )

    console.log(`CentreReportComponent: ${this.centreId}`);
  }
}
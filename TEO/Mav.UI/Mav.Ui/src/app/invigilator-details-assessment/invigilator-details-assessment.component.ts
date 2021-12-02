import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserAssessmentListingModel } from '../models/search/user.assessment.listing.model';
import { UserAssessmentSectionSearchModel } from '../models/search/user.assessment.section.search.model';
import { Paginate } from '../models/paginated.items';
import { UserAssessmentSectionListingModel } from '../models/search/user.assessment.section.listing.model';
import { UserAssessmentSectionService } from '../services/user-assessment-section.service';
import { AppComponentBase } from '../app.component.base';
import * as _ from 'lodash';
import { UserAssessmentService } from '../services/user-assessment.service';

@Component({
  selector: 'app-invigilator-details-assessment',
  templateUrl: './invigilator-details-assessment.component.html',
  styleUrls: ['./invigilator-details-assessment.component.css']
})
export class InvigilatorDetailsAssessmentComponent extends AppComponentBase implements OnInit {

  @Input() id: string;

  public latestAssessment: UserAssessmentListingModel = new UserAssessmentListingModel();

  public filterModel: UserAssessmentSectionSearchModel = new UserAssessmentSectionSearchModel();
  public searchModel: Paginate<UserAssessmentSectionListingModel> = new Paginate<UserAssessmentSectionListingModel>();

  public loadingText: string;
  public paginationItems = _.range(1, 1);

  public totalScore = 0;
  public totalQuestions = 0;

  constructor(
    public routeConfig: Router,
    private userAssessmentService: UserAssessmentService,
    private userAssessmentSectionService: UserAssessmentSectionService
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.actionPending = true;
    this.userAssessmentService.getUserLatestAssessment(this.id)
    .subscribe(
      r1 => {
        console.log(r1);
        this.latestAssessment = r1;
        if (!!this.latestAssessment) {
          this.filterModel.userAssessmentID = this.latestAssessment.userAssessmentID;
          this.resetSearch();
          this.userAssessmentSectionService.getUserAssessmentSectionListByUserId(this.filterModel)
          .subscribe(
            r2 => {
              console.log(r2);
              this.searchModel = r2;
              this.setTotals();
              this.actionPending = false;
            },
            (e2: Error) => {
              this.onApiError(e2.message);
            }
          );
        } else {
          this.actionPending = false;
        }
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

  private setTotals(): void {
    if (this.searchModel.items.length > 0) {
      this.totalScore = _.sumBy(this.searchModel.items, 'totalScore');
      this.totalQuestions = _.sumBy(this.searchModel.items, 'totalQuestions');
    }
  }

  private resetSearch(): void {
    this.filterModel.pageNo = 1;
    this.filterModel.pageSize = 100;
    this.filterModel.searchTerm = '';
    this.filterModel.searchField = '';

    this.searchModel.count = 0;
    this.searchModel.from = 0;
    this.searchModel.index = 0;
    this.searchModel.pages = 0;
    this.searchModel.items = [];
  }

}

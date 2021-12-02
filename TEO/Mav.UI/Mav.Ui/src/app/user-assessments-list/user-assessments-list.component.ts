import { Component, OnInit } from '@angular/core';
import { UserAssessmentSearchModel } from '../models/search/user.assessment.search.model';
import { Paginate } from '../models/paginated.items';
import { UserAssessmentListingModel } from '../models/search/user.assessment.listing.model';
import { AppComponentBase } from '../app.component.base';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { UserAssessmentService } from '../services/user-assessment.service';
import { UserServiceService } from '../services/user-service.service';
import { ExamUserViewModel } from '../models/user.exam.view.model';
import { AssessmentYearViewModel } from '../models/admin/assessment-year.view.model';
import { AssessmentYearService } from '../services/admin/assessment-year.service';
import { GlobalSettingsService } from '../services/global-settings.service';

@Component({
  selector: 'app-user-assessments-list',
  templateUrl: './user-assessments-list.component.html',
  styleUrls: ['./user-assessments-list.component.css']
})
export class UserAssessmentsListComponent extends AppComponentBase implements OnInit {

  public userID: string;
  public profileDetails: ExamUserViewModel = new ExamUserViewModel();
  public filterModel: UserAssessmentSearchModel = new UserAssessmentSearchModel();
  public searchModel: Paginate<UserAssessmentListingModel> = new Paginate<UserAssessmentListingModel>();
  public yearList: AssessmentYearViewModel[] = [];

  public loadingText: string;
  public paginationItems = _.range(1, 1);
  public currentAcademicYear: number;

  constructor(
    public routeConfig: Router,
    private userService: UserServiceService,
    private userAssessmentService: UserAssessmentService,
    private assessmentYearService: AssessmentYearService,
    private globalSettingsService: GlobalSettingsService
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.currentAcademicYear = this.globalSettingsService.getCurrentAcademicYear();
    this.resetSearch();
    this.userService.getCurrentUser<ExamUserViewModel>()
    .subscribe(
      r1 => {
        console.log(r1);
        this.profileDetails = r1;
        this.userID = this.profileDetails.id;
        this.filterModel.userID = this.userID;
        this.assessmentYearService.getAssessmentYearList()
        .subscribe(
          r2 => {
            console.log(r2);
            this.yearList = r2;
            this.actionPending = false;
            this.searchRecords();
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

  public newSearch(searchTerms: HTMLInputElement): void {
    this.filterModel.pageNo = 1;
    this.filterModel.searchTerm = searchTerms.value;
    this.searchRecords();
  }

  public PaginateSearch(page: number): void {
    this.filterModel.pageNo = page;
    this.searchRecords();
  }

  public setYear(entry): void {
    this.filterModel.yearID = entry;
    this.filterModel.pageNo = 1;
    this.searchRecords();
  }

  private searchRecords(): void {
    this.toggleLoadingText(-1);
    this.actionPending = true;

    this.userAssessmentService.getUserAssessmentListByUserId(this.filterModel)
    .subscribe(
      r1 => {
        this.actionPending = false;
        this.searchModel = r1;
        this.paginationItems = this.searchModel.pages > 0 ? _.range(1, this.searchModel.pages + 1) : _.range(1, 1);
        this.toggleLoadingText(this.searchModel.count);
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

  private resetSearch(): void {
    this.filterModel.pageNo = 1;
    this.filterModel.pageSize = 10;
    this.filterModel.searchTerm = '';
    this.filterModel.searchField = '';
    this.filterModel.yearID = this.currentAcademicYear;

    this.searchModel.count = 0;
    this.searchModel.from = 0;
    this.searchModel.index = 0;
    this.searchModel.pages = 0;
    this.searchModel.items = [];
  }

}

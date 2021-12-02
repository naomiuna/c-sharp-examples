import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '../app.component.base';
import { AssessmentSearchModel } from '../models/search/Assessment.search.model';
import { AssessmentListingModel } from '../models/assessment.listing.model';
import { Paginate } from '../models/paginated.items';
import * as _ from 'lodash';
import { AssessmentService } from '../services/admin/assessment.service';
import { AssessmentYearViewModel } from '../models/admin/assessment-year.view.model';
import { AssessmentYearService } from '../services/admin/assessment-year.service';

@Component({
  selector: 'app-assessments-list',
  templateUrl: './assessments-list.component.html',
  styleUrls: ['./assessments-list.component.css']
})
export class AssessmentsListComponent extends AppComponentBase implements OnInit {

  public filterModel: AssessmentSearchModel = new AssessmentSearchModel();
  public searchModel: Paginate<AssessmentListingModel> = new Paginate<AssessmentListingModel>();
  public yearList: AssessmentYearViewModel[] = [];

  public loadingText: string;
  public paginationItems = _.range(1, 1);

  constructor(
    public routeConfig: Router,
    private assessmentService: AssessmentService,
    private assessmentYearService: AssessmentYearService
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.resetSearch();
    this.assessmentYearService.getAssessmentYearList()
    .subscribe(
      r1 => {
        console.log(r1);
        this.yearList = r1;
        this.searchRecords();
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
    console.log(entry);
    this.filterModel.yearID = entry;
  }

  public setOrder(entry): void {
    console.log(entry);
    this.filterModel.orderID = entry;
  }

  private searchRecords(): void {
    this.toggleLoadingText(-1);
    this.actionPending = true;

    this.assessmentService.getAllAssessments(this.filterModel)
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
    this.filterModel.searchField = 'Surname';
    this.filterModel.yearID = null;
    this.filterModel.orderID = 1;
    this.filterModel.statusID = 0;

    
    this.searchModel.from = 0;
    this.searchModel.index = 0;
    this.searchModel.pages = 0;
    this.searchModel.items = [];
  }

  // Functions to navigate the user to the specific assessment add page
  public goToAddAssessment() {
    this.routeConfig.navigate([`admin/assessments-create`]);
  }

  public goToAddEoQualification() {
    this.routeConfig.navigate([`admin/assessments-create-eo`]);
  }
}

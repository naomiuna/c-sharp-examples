import { Component, OnInit, Input } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router } from '@angular/router';
import { UserAssessmentSectionService } from '../services/user-assessment-section.service';
import { UserAssessmentSectionListingModel } from '../models/search/user.assessment.section.listing.model';
import { UserAssessmentSectionSearchModel } from '../models/search/user.assessment.section.search.model';
import { Paginate } from '../models/paginated.items';
import * as _ from 'lodash';

@Component({
  selector: 'app-user-assessment-details-sections-list',
  templateUrl: './user-assessment-details-sections-list.component.html',
  styleUrls: ['./user-assessment-details-sections-list.component.css']
})
export class UserAssessmentDetailsSectionsListComponent extends AppComponentBase implements OnInit {

  @Input() id: number; // UserAssessmentID

  public filterModel: UserAssessmentSectionSearchModel = new UserAssessmentSectionSearchModel();
  public searchModel: Paginate<UserAssessmentSectionListingModel> = new Paginate<UserAssessmentSectionListingModel>();

  public loadingText: string;
  public paginationItems = _.range(1, 1);

  constructor(
    public routeConfig: Router,
    private userAssessmentSectionService: UserAssessmentSectionService
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.filterModel.userAssessmentID = this.id;
    this.resetSearch();
    this.searchRecords();
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

  private searchRecords(): void {
    this.toggleLoadingText(-1);
    this.actionPending = true;

    this.userAssessmentSectionService.getUserAssessmentSectionListByUserId(this.filterModel)
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

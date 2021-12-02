import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserAssessmentListingModel } from '../models/search/user.assessment.listing.model';
import { UserAssessmentSectionSearchModel } from '../models/search/user.assessment.section.search.model';
import { Paginate } from '../models/paginated.items';
import { UserAssessmentSectionListingModel } from '../models/search/user.assessment.section.listing.model';
import { UserAssessmentSectionService } from '../services/user-assessment-section.service';
import { AppComponentBase } from '../app.component.base';
import { PermissionsServiceService } from '../services/permissions-service.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-user-assessment-history-list',
  templateUrl: './user-assessment-history-list.component.html',
  styleUrls: ['./user-assessment-history-list.component.css']
})
export class UserAssessmentHistoryListComponent extends AppComponentBase implements OnInit {

  @Input() assessment: UserAssessmentListingModel;

  @Input() userID: string;

  public displayDetails = false;
  public detailsPopulated = false;
  public tabToShow = 'details';

  public filterModel: UserAssessmentSectionSearchModel = new UserAssessmentSectionSearchModel();
  public searchModel: Paginate<UserAssessmentSectionListingModel> = new Paginate<UserAssessmentSectionListingModel>();

  public loadingText: string;
  public paginationItems = _.range(1, 1);

  public totalScore = 0;
  public totalQuestions = 0;

  constructor(
    public routeConfig: Router,
    private permissionsService: PermissionsServiceService,
    private userAssessmentSectionService: UserAssessmentSectionService
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    this.filterModel.userAssessmentID = this.assessment.userAssessmentID;
    this.resetSearch();
  }

  public viewSectionDetails(): void {

    console.log("USERID", this.userID);

    this.toggleDisplayDetails();
    if (this.displayDetails === true && !this.detailsPopulated) {
      this.actionPending = true;
      this.userAssessmentSectionService.getUserAssessmentSectionListByUserId(this.filterModel)
      .subscribe(
        r1 => {
          this.actionPending = false;
          this.searchModel = r1;

          this.searchModel.items.forEach(item => {
              item.showStatement = false;
          });

          this.paginationItems = this.searchModel.pages > 0 ? _.range(1, this.searchModel.pages + 1) : _.range(1, 1);
          this.setTotals();
          this.detailsPopulated = true;
        },
        e1 => {
          console.log(e1);
          this.actionPending = false;
          this.error = `An unexpected error has occurred`;
        }
      );
    }
  }

  public viewCerfificate(): void {
    this.routeConfig.navigate([`/user-assessment-history-certificate/${this.assessment.userAssessmentID}/${this.assessment.keyID}`]);
    return;
  }

  private setTotals(): void {
    if (this.searchModel.items.length > 0) {
      this.totalScore = _.sumBy(this.searchModel.items, 'totalScore');
      this.totalQuestions = _.sumBy(this.searchModel.items, 'totalQuestions');
    }
  }

  private toggleDisplayDetails(): void {
    const tempBool = this.displayDetails;
    this.displayDetails = !tempBool;
  }

   public show(tabName): void {
      this.tabToShow = tabName;
   }

   public toggleStatement(item){
      item.showStatement = !item.showStatement;
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

  public userHasConfirmation(): boolean {
    //get user type of the assessment user and show if exams officer or SLT
    return true;
  }
}

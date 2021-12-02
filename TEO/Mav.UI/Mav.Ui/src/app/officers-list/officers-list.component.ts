import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserSearchModel } from '../models/search/user.search.model';
import { AppComponentBase } from '../app.component.base';
import { Paginate } from '../models/paginated.items';
import { UserListingModel } from '../models/user.listing.model';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import * as _ from 'lodash';
import { GenericEventArgs } from '../models/admin/generic-event-args';
import { EnumEventType } from '../models/admin/generic-event-type';

@Component({
  selector: 'app-officers-list',
  templateUrl: './officers-list.component.html',
  styleUrls: ['./officers-list.component.css']
})
export class OfficersListComponent extends AppComponentBase implements OnInit {

  @Input() id: number; // Centre ID

  @Output() officerActionRequest: EventEmitter<GenericEventArgs>;

  private eventArgs: GenericEventArgs;

  public filterModel: UserSearchModel = new UserSearchModel();
  public searchModel: Paginate<UserListingModel> = new Paginate<UserListingModel>();

  public displayYearFilter = false;
  public loadingText: string;
  public paginationItems = _.range(1, 1);

  constructor(
    public routeConfig: Router,
    private userService: UserServiceService
  ) {
    super(routeConfig);
    this.officerActionRequest = new EventEmitter<GenericEventArgs>();
  }

  ngOnInit() {
    super.ngOnInit();
    this.resetSearch();
    this.searchRecords();
  }

  public goToAddOfficer(): void {
    this.eventArgs = new GenericEventArgs();
    this.eventArgs.keyID = this.id;
    this.eventArgs.eventType = EnumEventType.OfficerAdd;
    this.officerActionRequest.emit(this.eventArgs);
  }

  /*goToEditOfficer(userId: string) {
    this.eventArgs = new GenericEventArgs();
    this.eventArgs.stringID = userId;
    this.eventArgs.eventType = EnumEventType.OfficerSelectedFromList;
    this.officerActionRequest.emit(this.eventArgs);
  }*/

  goToEditOfficer(userId: string) {
    this.routeConfig.navigate([`officer-details/${userId}`]);
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

  public setSearchField(entry): void {
    console.log(entry);
    if (entry === '1') {
      this.filterModel.searchField = 'Surname';
    }
    if (entry === '2') {
      this.filterModel.searchField = 'Email';
    }
  }

  public setYear(entry): void {
    console.log(entry);
    this.filterModel.year = entry;
  }

  private searchRecords(): void {
    this.toggleLoadingText(-1);
    this.actionPending = true;

    this.userService.getOfficerSearch(this.filterModel)
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
    this.filterModel.role = '';
    this.filterModel.centreID = this.id;

    this.searchModel.count = 0;
    this.searchModel.from = 0;
    this.searchModel.index = 0;
    this.searchModel.pages = 0;
    this.searchModel.items = [];
  }

}

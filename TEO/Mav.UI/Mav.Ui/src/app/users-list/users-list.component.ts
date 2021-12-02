import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '../app.component.base';
import { UserSearchModel } from '../models/search/user.search.model';
import { UserListingModel } from '../models/user.listing.model';
import { Paginate } from '../models/paginated.items';
import * as _ from 'lodash';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent extends AppComponentBase implements OnInit {

  public filterModel: UserSearchModel = new UserSearchModel();
  public searchModel: Paginate<UserListingModel> = new Paginate<UserListingModel>();

  public loadingText: string;
  public paginationItems = _.range(1, 1);

  constructor(
    public routeConfig: Router,
    private userService: UserServiceService
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    super.ngOnInit();
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

  public setSearchField(entry): void {
    console.log(entry);
    if (entry === '1') {
      this.filterModel.searchField = 'Surname';
    }
    if (entry === '2') {
      this.filterModel.searchField = 'Email';
    }
  }

  public setRole(entry): void {
    console.log(entry);
    if (entry === '0') { this.filterModel.role = ''; }
    if (entry === '1') { this.filterModel.role = 'Administrator'; }
    if (entry === '2') { this.filterModel.role = 'Editor'; }
  }

  private searchRecords(): void {
    this.toggleLoadingText(-1);
    this.actionPending = true;

    this.userService.getAdminUserSearch(this.filterModel)
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

    this.searchModel.count = 0;
    this.searchModel.from = 0;
    this.searchModel.index = 0;
    this.searchModel.pages = 0;
    this.searchModel.items = [];
  }

}

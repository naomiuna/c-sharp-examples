import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GenericEventArgs } from '../models/admin/generic-event-args';
import { EnumEventType } from '../models/admin/generic-event-type';
import { SectionSearchModel } from '../models/search/section.search.model';
import { SectionListingModel } from '../models/search/section.listing.model';
import { Paginate } from '../models/paginated.items';
import { SectionService } from '../services/section.service';
import { AppComponentBase } from '../app.component.base';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { EnumStatusCode } from '../models/generic.status';

declare function removeModal(modalType: string): any;

@Component({
  selector: 'app-assessments-section-edit-list',
  templateUrl: './assessments-section-edit-list.component.html',
  styleUrls: ['./assessments-section-edit-list.component.css']
})
export class AssessmentsSectionEditListComponent extends AppComponentBase implements OnInit {

  @Input() id: number;

  @Output() sectionActionRequest: EventEmitter<GenericEventArgs>;

  private actionKeyID: number;

  private eventArgs: GenericEventArgs;

  public filterModel: SectionSearchModel = new SectionSearchModel();
  public searchModel: Paginate<SectionListingModel> = new Paginate<SectionListingModel>();

  public loadingText: string;
  public paginationItems = _.range(1, 1);

  constructor(
    public routeConfig: Router,
    private sectionService: SectionService
  ) {
    super(routeConfig);
    this.sectionActionRequest = new EventEmitter<GenericEventArgs>();
  }

  ngOnInit() {
    this.resetSearch();
    this.searchRecords();
  }

  public editSectionItem(rowID: number): void {
    this.eventArgs = new GenericEventArgs();
    this.eventArgs.keyID = rowID;
    this.eventArgs.eventType = EnumEventType.SectionSelectedFromList;
    this.sectionActionRequest.emit(this.eventArgs);
  }

  public newSearch(searchTerms: HTMLInputElement): void {
    this.filterModel.pageNo = 1;
    this.searchRecords();
  }

  public PaginateSearch(page: number): void {
    this.filterModel.pageNo = page;
    this.searchRecords();
  }

  public deleteSectionItem(sectionID: number): void {
    this.actionKeyID = sectionID;
  }

  public performDeleteSectionItem(): void {
    if (this.actionKeyID > 0) {
      this.sectionService.deleteSection(this.actionKeyID)
      .subscribe(
        r1 => {
          console.log(r1);
          if (r1.status === EnumStatusCode.Ok) {
            this.resetSearch();
            this.searchRecords();
            removeModal('del_section_modal');
          } else {
            this.error = r1.message;
          }
        },
        (e1: Error) => {
          this.onApiError(e1.message);
        }
      );
    }
  }

  private searchRecords(): void {
    this.toggleLoadingText(-1);
    this.actionPending = true;

    this.sectionService.getSectionListPages(this.filterModel)
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
    this.filterModel.assessmentID = this.id;

    this.searchModel.count = 0;
    this.searchModel.from = 0;
    this.searchModel.index = 0;
    this.searchModel.pages = 0;
    this.searchModel.items = [];
  }
}

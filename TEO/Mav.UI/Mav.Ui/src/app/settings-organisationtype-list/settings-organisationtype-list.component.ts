import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { OrganisationTypeViewModel } from '../models/admin/organisation-type.view.model';
import { Router } from '@angular/router';
import { OrganisationTypeService } from '../services/admin/organisation-type.service';

@Component({
  selector: 'app-settings-organisationtype-list',
  templateUrl: './settings-organisationtype-list.component.html',
  styleUrls: ['./settings-organisationtype-list.component.css']
})
export class SettingsOrganisationtypeListComponent extends AppComponentBase implements OnInit {

  public searchModel: OrganisationTypeViewModel[];
  public loadingText: string;

  constructor(
    public routeConfig: Router,
    private organisationTypeService: OrganisationTypeService
  ) {
    super(routeConfig);
    this.searchModel = [];
  }

  ngOnInit() {
    super.ngOnInit();
    this.searchRecords();
  }

  private searchRecords(): void {
    this.toggleLoadingText(-1);
    this.actionPending = true;

    this.organisationTypeService.getOrganisationTypeList()
    .subscribe(
      r1 => {
        this.actionPending = false;
        this.searchModel = r1;
        this.toggleLoadingText(this.searchModel.length);
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

}

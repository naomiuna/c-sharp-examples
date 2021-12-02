import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { CentreTypeViewModel } from '../models/admin/centre-type.view.model';
import { Router } from '@angular/router';
import { CentreTypeService } from '../services/admin/centre-type.service';

@Component({
  selector: 'app-settings-centretype-list',
  templateUrl: './settings-centretype-list.component.html',
  styleUrls: ['./settings-centretype-list.component.css']
})
export class SettingsCentretypeListComponent extends AppComponentBase implements OnInit {

  public searchModel: CentreTypeViewModel[];
  public loadingText: string;

  constructor(
    public routeConfig: Router,
    private centreTypeService: CentreTypeService
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

    this.centreTypeService.getCentreTypeList()
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

import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { SettingViewModel } from '../models/admin/setting.view.model';
import { Router } from '@angular/router';
import { SettingsService } from '../services/admin/settings.service';

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.css']
})
export class SettingsListComponent extends AppComponentBase implements OnInit {

  public searchModel: SettingViewModel[];
  public loadingText: string;

  constructor(
    public routeConfig: Router,
    private settingsService: SettingsService
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

    this.settingsService.getSettings()
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

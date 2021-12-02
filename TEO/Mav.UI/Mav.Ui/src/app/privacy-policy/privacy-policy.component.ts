import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router } from '@angular/router';
import { PageServiceService } from '../services/admin/page-service.service';
import { PageViewModel } from '../models/admin/page.view.model';
import { GlobalSettingsService } from '../services/global-settings.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent extends AppComponentBase implements OnInit {

  public pageDetails: PageViewModel;

  public pageTitle = '';
  public pageContent = '';

  constructor(
    public routeConfig: Router,
    private pageService: PageServiceService,
    private globalSettings: GlobalSettingsService
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.actionPending = true;
    this.pageService.getPageById<PageViewModel>(this.globalSettings.contentPages.privacyPolicy)
    .subscribe(
      r1 => {
        console.log(r1);
        this.pageDetails = r1;
        this.pageTitle = this.pageDetails.pageInfo.title;
        this.pageContent = this.pageDetails.pageInfo.content;
        this.actionPending = false;
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

}

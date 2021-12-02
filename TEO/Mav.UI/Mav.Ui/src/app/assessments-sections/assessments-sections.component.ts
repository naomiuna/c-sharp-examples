import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GenericEventArgs } from '../models/admin/generic-event-args';
import { EnumEventType } from '../models/admin/generic-event-type';
import { AppAdminAssessmentBase } from '../app.admin.assessment.base';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-assessments-sections',
  templateUrl: './assessments-sections.component.html',
  styleUrls: ['./assessments-sections.component.css']
})
export class AssessmentsSectionsComponent extends AppAdminAssessmentBase implements OnInit, OnDestroy {

  @Input() id: number; // Assessment ID

  @Input() tabevents: Observable<string>;

  private tabeventsSubscription: any;
  public activeTab: number;
  public editKey: number;

  constructor(public routeConfig: Router) {
    super(routeConfig);
   }

  ngOnInit() {
    this.activeTab = 1;
    this.editKey = 0;
    this.displaySuccessMessage = false;
    this.tabeventsSubscription = this.tabevents.subscribe((tab) => this.setActiveTabByName(tab));
  }

  ngOnDestroy() {
    this.tabeventsSubscription.unsubscribe();
  }

  public setActiveTab(tabId: number): void {
    this.activeTab = tabId;
  }

  public setActiveTabByName(tabName: string): void {
    switch (tabName) {
      case 'section-list':
        this.setActiveTab(1);
        break;
      case 'add-section':
        this.setActiveTab(2);
        break;
      case 'edit-section':
        this.setActiveTab(3);
        break;
      default:
        this.setActiveTab(1);
        break;
    }
  }

  public sectionEventRaised(data: GenericEventArgs): void {
    console.log(`sectionEventRaised: ${data}`);
    if (data.eventType === EnumEventType.SectionAdded) {
      this.editKey = data.keyID;
      this.setActiveTabByName('edit-section');
    } else if (data.eventType === EnumEventType.SectionUpdated) {
      // this.displaySuccessMessage = true;
      // this.successMessage = `Section details successfully updated`;
    } else if (data.eventType === EnumEventType.SectionSelectedFromList) {
      this.editKey = data.keyID;
      this.setActiveTabByName('edit-section');
    } else {
      this.editKey = 0;
      this.setActiveTabByName('section-list');
    }
  }
}

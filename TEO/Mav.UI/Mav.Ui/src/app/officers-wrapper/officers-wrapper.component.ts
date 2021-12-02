import { Component, OnInit, Input } from '@angular/core';
import { AppAdminAssessmentBase } from '../app.admin.assessment.base';
import { Router } from '@angular/router';
import { GenericEventArgs } from '../models/admin/generic-event-args';
import { EnumEventType } from '../models/admin/generic-event-type';

@Component({
  selector: 'app-officers-wrapper',
  templateUrl: './officers-wrapper.component.html',
  styleUrls: ['./officers-wrapper.component.css']
})
export class OfficersWrapperComponent extends AppAdminAssessmentBase implements OnInit {

  @Input() id: number; // Centre ID

  public activeTab: number;
  public editKey: string;

  constructor(public routeConfig: Router) {
    super(routeConfig);
   }

  ngOnInit() {
    this.activeTab = 1;
    this.editKey = '';
    this.displaySuccessMessage = false;
  }

  public setActiveTab(tabId: number): void {
    this.activeTab = tabId;
  }

  public setActiveTabByName(tabName: string): void {
    switch (tabName) {
      case 'officers-list':
        this.setActiveTab(1);
        break;
      case 'add-officer':
        this.setActiveTab(2);
        break;
      case 'edit-officer':
        this.setActiveTab(3);
        break;
      default:
        this.setActiveTab(1);
        break;
    }
  }

  public officerEventRaised(data: GenericEventArgs): void {
    this.displaySuccessMessage = false;
    this.successMessage = '';
    if (data.eventType === EnumEventType.OfficerAdd) {
      this.setActiveTabByName('add-officer');
    } else if (data.eventType === EnumEventType.OfficerAdded) {
      this.displaySuccessMessage = true;
      this.successMessage = 'Exam officer account created and awaiting verification';
      this.setActiveTabByName('officers-list');
    } else if (data.eventType === EnumEventType.OfficerSelectedFromList) {
      this.editKey = data.stringID;
      this.setActiveTabByName('edit-officer');
    } else {
      this.editKey = '';
      this.setActiveTabByName('officers-list');
    }
  }

}

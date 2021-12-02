import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppAdminAssessmentBase } from '../app.admin.assessment.base';
import { GenericEventArgs } from '../models/admin/generic-event-args';
import { EnumEventType } from '../models/admin/generic-event-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessments-section-edit',
  templateUrl: './assessments-section-edit.component.html',
  styleUrls: ['./assessments-section-edit.component.css']
})
export class AssessmentsSectionEditComponent extends AppAdminAssessmentBase implements OnInit {

  @Input() id: number; // Section ID

  @Output() sectionActionRequest: EventEmitter<GenericEventArgs>;

  private eventArgs: GenericEventArgs;

  public activeTab: number;

  constructor(
    public routeConfig: Router
  ) {
    super(routeConfig);

    this.sectionActionRequest = new EventEmitter<GenericEventArgs>();
  }

  ngOnInit() {
    super.ngOnInit();
    this.activeTab = 1;
  }

  sectionUpdateComplete(): void {
    this.eventArgs = new GenericEventArgs();
    this.eventArgs.keyID = this.id;
    this.eventArgs.eventType = EnumEventType.SectionUpdated;
    this.sectionActionRequest.emit(this.eventArgs);
  }

  sectionUpdateCancel() {
    this.eventArgs = new GenericEventArgs();
    this.eventArgs.keyID = this.id;
    this.eventArgs.eventType = EnumEventType.SectionUpdateCancel;
    this.sectionActionRequest.emit(this.eventArgs);
  }

  public setActiveTab(tabId: number): void {
    this.activeTab = tabId;
  }

  public setActiveTabByName(tabName: string): void {
    switch (tabName) {
      case 'section-overview':
        this.setActiveTab(1);
        break;
      case 'categories':
        this.setActiveTab(2);
        break;
      case 'questions':
        this.setActiveTab(3);
        break;
      default:
        this.setActiveTab(1);
        break;
    }
  }

  public sectionEventRaised(data: GenericEventArgs): void {
    if (data.eventType === EnumEventType.SectionUpdated) {
      this.sectionUpdateComplete();
    } else if (data.eventType === EnumEventType.SectionUpdateCancel) {
      this.sectionUpdateCancel();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppAdminAssessmentBase } from '../app.admin.assessment.base';
import { Subject } from 'rxjs/Subject';
import * as TinyMce from 'tinymce';
import { tinymceDefaultSettings } from 'angular-tinymce';

declare function tinyImagesPicker(cb: any, value: any, meta: any): any;

@Component({
  selector: 'app-assessments-edit',
  templateUrl: './assessments-edit.component.html',
  styleUrls: ['./assessments-edit.component.css']
})
export class AssessmentsEditComponent extends AppAdminAssessmentBase implements OnInit {

  public id: number;
  public activeTab: number;

  private tabEvents: Subject<string> = new Subject<string>();

  public customEditorSettings: TinyMce.Settings | any;

  constructor(
    public routeConfig: Router,
    private activeRoute: ActivatedRoute
  ) {
    super(routeConfig);

    this.customEditorSettings = tinymceDefaultSettings();
    this.customEditorSettings.plugins = 'lists fullscreen spellchecker code image media link textcolor table';
    this.customEditorSettings.height = 350;
    this.customEditorSettings.file_picker_callback = tinyImagesPicker;
    this.customEditorSettings.toolbar = 'undo redo | styleselect | bold italic underline | forecolor backcolor | alignleft aligncentre alignright alignjustify | numlist bullist | outdenet indnt | table | tools image | link unlink';
  }

  ngOnInit() {
    const routeParams = this.activeRoute.snapshot.params;
    this.id = routeParams.id;
    this.buildForm();
  }

  public setActiveTab(tabId: number): void {
    this.activeTab = tabId;
    this.tabEvents.next('section-list');
  }

  private buildForm(): void {
    this.activeTab = 1;
  }
}

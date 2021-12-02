import { Component, OnInit, Input } from '@angular/core';
import { AssessmentYearViewModel } from '../models/admin/assessment-year.view.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-years-list-item',
  templateUrl: './settings-years-list-item.component.html',
  styleUrls: ['./settings-years-list-item.component.css']
})
export class SettingsYearsListItemComponent implements OnInit {

  @Input() setting: AssessmentYearViewModel;

  constructor(private routeConfig: Router) {}

  ngOnInit() {
  }

  goToItem() {
    this.routeConfig.navigate([`admin/settings/years/edit//${this.setting.id}`]);
  }

}

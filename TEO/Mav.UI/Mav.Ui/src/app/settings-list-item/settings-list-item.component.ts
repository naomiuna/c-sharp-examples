import { Component, OnInit, Input } from '@angular/core';
import { SettingViewModel } from '../models/admin/setting.view.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-list-item',
  templateUrl: './settings-list-item.component.html',
  styleUrls: ['./settings-list-item.component.css']
})
export class SettingsListItemComponent implements OnInit {

  @Input() setting: SettingViewModel;

  constructor(private routeConfig: Router) {}

  ngOnInit() {
  }

  goToItem() {
    this.routeConfig.navigate([`admin/settings-edit/${this.setting.id}`]);
  }

}

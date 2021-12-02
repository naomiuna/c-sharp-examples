import { Component, OnInit, Input } from '@angular/core';
import { CentreTypeViewModel } from '../models/admin/centre-type.view.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-centretype-list-item',
  templateUrl: './settings-centretype-list-item.component.html',
  styleUrls: ['./settings-centretype-list-item.component.css']
})
export class SettingsCentretypeListItemComponent implements OnInit {

  @Input() setting: CentreTypeViewModel;

  constructor(private routeConfig: Router) {}

  ngOnInit() {
  }

  goToItem() {
    this.routeConfig.navigate([`admin/settings/centretype/edit/${this.setting.id}`]);
  }

}

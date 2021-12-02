import { Component, OnInit, Input } from '@angular/core';
import { OrganisationTypeViewModel } from '../models/admin/organisation-type.view.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-organisationtype-list-item',
  templateUrl: './settings-organisationtype-list-item.component.html',
  styleUrls: ['./settings-organisationtype-list-item.component.css']
})
export class SettingsOrganisationtypeListItemComponent implements OnInit {

  @Input() setting: OrganisationTypeViewModel;

  constructor(private routeConfig: Router) {}

  ngOnInit() {
  }

  goToItem() {
    this.routeConfig.navigate([`admin/settings/organisationtype/edit/${this.setting.id}`]);
  }
}

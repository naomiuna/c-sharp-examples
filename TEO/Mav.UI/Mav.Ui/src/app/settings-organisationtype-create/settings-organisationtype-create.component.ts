import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '../app.component.base';

@Component({
  selector: 'app-settings-organisationtype-create',
  templateUrl: './settings-organisationtype-create.component.html',
  styleUrls: ['./settings-organisationtype-create.component.css']
})
export class SettingsOrganisationtypeCreateComponent extends AppComponentBase implements OnInit {

  constructor(
    public routeConfig: Router
  ) 
  {
    super(routeConfig);
   }

  ngOnInit() {
  }

}

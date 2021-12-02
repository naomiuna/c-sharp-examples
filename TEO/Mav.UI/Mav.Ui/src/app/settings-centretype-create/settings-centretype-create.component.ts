import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-centretype-create',
  templateUrl: './settings-centretype-create.component.html',
  styleUrls: ['./settings-centretype-create.component.css']
})
export class SettingsCentretypeCreateComponent extends AppComponentBase implements OnInit {

  constructor(
    public routeConfig: Router
  ) {
    super(routeConfig);
  }

  public ngOnInit() {}

}

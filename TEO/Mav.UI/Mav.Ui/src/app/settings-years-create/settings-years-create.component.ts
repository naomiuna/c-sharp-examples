import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-years-create',
  templateUrl: './settings-years-create.component.html',
  styleUrls: ['./settings-years-create.component.css']
})
export class SettingsYearsCreateComponent extends AppComponentBase implements OnInit {

  constructor(
    public routeConfig: Router
  ) {
    super(routeConfig);
  }

  public ngOnInit() {}

}

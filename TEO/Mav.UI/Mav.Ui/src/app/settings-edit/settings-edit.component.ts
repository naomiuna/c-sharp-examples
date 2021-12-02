import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '../app.component.base';

@Component({
  selector: 'app-settings-edit',
  templateUrl: './settings-edit.component.html',
  styleUrls: ['./settings-edit.component.css']
})
export class SettingsEditComponent extends AppComponentBase implements OnInit {

  public id: number;

  constructor(
    public routeConfig: Router,
    private activeRoute: ActivatedRoute
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    const routeParams = this.activeRoute.snapshot.params;
    this.id = routeParams.id;
  }

}

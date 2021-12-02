import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings-years-edit',
  templateUrl: './settings-years-edit.component.html',
  styleUrls: ['./settings-years-edit.component.css']
})
export class SettingsYearsEditComponent extends AppComponentBase implements OnInit {

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

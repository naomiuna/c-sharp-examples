import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '../app.component.base';

@Component({
  selector: 'app-centres-edit',
  templateUrl: './centres-edit.component.html',
  styleUrls: ['./centres-edit.component.css']
})
export class CentresEditComponent extends AppComponentBase implements OnInit {

  public id: number;
  public activeTab: number;

  constructor(
    public routeConfig: Router,
    private activeRoute: ActivatedRoute
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    const routeParams = this.activeRoute.snapshot.params;
    this.id = routeParams.id;
    this.buildForm();
  }

  public setActiveTab(tabId: number): void {
    this.activeTab = tabId;
  }

  private buildForm(): void {
    this.activeTab = 1;
  }

}

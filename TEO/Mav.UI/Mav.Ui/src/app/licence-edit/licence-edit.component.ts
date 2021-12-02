import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-licence-edit',
  templateUrl: './licence-edit.component.html',
  styleUrls: ['./licence-edit.component.css']
})
export class LicenceEditComponent extends AppComponentBase implements OnInit {

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

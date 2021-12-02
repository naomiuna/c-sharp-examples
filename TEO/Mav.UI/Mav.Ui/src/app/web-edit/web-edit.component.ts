import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-web-edit',
  templateUrl: './web-edit.component.html',
  styleUrls: ['./web-edit.component.css']
})
export class WebEditComponent extends AppComponentBase implements OnInit {

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

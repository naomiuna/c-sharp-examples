import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '../app.component.base';

@Component({
  selector: 'app-invigilator-details',
  templateUrl: './invigilator-details.component.html',
  styleUrls: ['./invigilator-details.component.css']
})
export class InvigilatorDetailsComponent extends AppComponentBase implements OnInit {

  public id: string;

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

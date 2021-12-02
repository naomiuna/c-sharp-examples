import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-assessment-details',
  templateUrl: './user-assessment-details.component.html',
  styleUrls: ['./user-assessment-details.component.css']
})
export class UserAssessmentDetailsComponent extends AppComponentBase implements OnInit {

  public id: number; // UserAssessmentID

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

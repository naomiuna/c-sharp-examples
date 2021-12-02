import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reporting-assessment-sections',
  templateUrl: './reporting-assessment-sections.component.html',
  styleUrls: ['./reporting-assessment-sections.component.css']
})
export class ReportingAssessmentSectionsComponent extends AppComponentBase implements OnInit {

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
    console.log(`ReportingAssessmentSectionsComponent: ${this.id}`);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AssessmentListingModel } from '../models/assessment.listing.model';

@Component({
  selector: 'app-reporting-assessment-list-item',
  templateUrl: './reporting-assessment-list-item.component.html',
  styleUrls: ['./reporting-assessment-list-item.component.css']
})
export class ReportingAssessmentListItemComponent implements OnInit {

  @Input() assessment: AssessmentListingModel;

  constructor(private routeConfig: Router) {}

  ngOnInit() {
  }

  goToItem() {
    this.routeConfig.navigate([`admin/reporting-assessment-sections/${this.assessment.id}`]);
    console.log(this.assessment.id);
  }

}

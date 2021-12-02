import { Component, OnInit, Input } from '@angular/core';
import { AssessmentListingModel } from '../models/assessment.listing.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessments-list-item',
  templateUrl: './assessments-list-item.component.html',
  styleUrls: ['./assessments-list-item.component.css']
})
export class AssessmentsListItemComponent implements OnInit {

  @Input() assessment: AssessmentListingModel;

  constructor(private routeConfig: Router) {}

  ngOnInit() {
  }

  goToItem() {
    this.routeConfig.navigate([`admin/assessments-edit/${this.assessment.id}`]);
  }

  // Open modal for duplicating assessment
  // - get assessment and all details
  // - prepopulate required fields
  // - show modal
  goToDuplication() {
    console.log("duplicate assessment: ", this.assessment.id);
    this.routeConfig.navigate([`admin/assessments-duplicate/${this.assessment.id}`]);
  }

}

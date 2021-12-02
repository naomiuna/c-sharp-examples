import { Component, OnInit, Input } from '@angular/core';
import { UserAssessmentSectionListingModel } from '../models/search/user.assessment.section.listing.model';

@Component({
  selector: 'app-user-assessment-details-sections-list-minitem',
  templateUrl: './user-assessment-details-sections-list-minitem.component.html',
  styleUrls: ['./user-assessment-details-sections-list-minitem.component.css']
})
export class UserAssessmentDetailsSectionsListMinitemComponent implements OnInit {

  @Input() section: UserAssessmentSectionListingModel;

  constructor() {}

  ngOnInit() {
  }

}

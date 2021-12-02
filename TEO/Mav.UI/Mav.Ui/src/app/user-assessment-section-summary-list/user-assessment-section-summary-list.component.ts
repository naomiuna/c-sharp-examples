import { Component, OnInit, Input } from '@angular/core';
import { AssessmentSectionSummary } from '../models/assessment.section.summary';

@Component({
  selector: 'app-user-assessment-section-summary-list',
  templateUrl: './user-assessment-section-summary-list.component.html',
  styleUrls: ['./user-assessment-section-summary-list.component.css']
})
export class UserAssessmentSectionSummaryListComponent implements OnInit {

  @Input() summary: AssessmentSectionSummary[];

  constructor() { }

  ngOnInit() {

  }

}

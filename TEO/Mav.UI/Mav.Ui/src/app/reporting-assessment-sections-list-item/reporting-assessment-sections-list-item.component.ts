import { Component, OnInit, Input } from '@angular/core';
import { SectionListingModel } from '../models/search/section.listing.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reporting-assessment-sections-list-item',
  templateUrl: './reporting-assessment-sections-list-item.component.html',
  styleUrls: ['./reporting-assessment-sections-list-item.component.css']
})
export class ReportingAssessmentSectionsListItemComponent implements OnInit {

  @Input() section: SectionListingModel;

  constructor(private routeConfig: Router) { }

  ngOnInit() {
  }

  goToItem() {
    this.routeConfig.navigate([`admin/reporting-section/${this.section.id}`]);
    console.log(this.section.id);
  }

}

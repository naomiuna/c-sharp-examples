import { Component, OnInit, Input } from '@angular/core';
import { SectionReportModel } from '../models/reporting/section.report.model';

@Component({
  selector: 'app-reporting-section-item',
  templateUrl: './reporting-section-item.component.html',
  styleUrls: ['./reporting-section-item.component.css']
})
export class ReportingSectionItemComponent implements OnInit {

  @Input() item: SectionReportModel;

  constructor() { }

  ngOnInit() {
    console.log(this.item.number);
  }

}

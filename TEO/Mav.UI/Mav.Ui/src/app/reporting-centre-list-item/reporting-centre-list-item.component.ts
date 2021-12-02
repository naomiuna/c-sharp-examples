import { Component, OnInit, Input } from '@angular/core';
import { CentreListingModel } from '../models/centre.listing.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reporting-centre-list-item',
  templateUrl: './reporting-centre-list-item.component.html',
  styleUrls: ['./reporting-centre-list-item.component.css']
})
export class ReportingCentreListItemComponent implements OnInit {

  @Input() centre: CentreListingModel;

  constructor(private routeConfig: Router) { }

  ngOnInit() {
  }

  goToItem() {
    this.routeConfig.navigate([`admin/reporting-centre-info/${this.centre.id}`]);
  }

}

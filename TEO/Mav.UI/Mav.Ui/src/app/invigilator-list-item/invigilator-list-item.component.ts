import { Component, OnInit, Input } from '@angular/core';
import { InvigilatorListingModel } from '../models/invigilator.listing.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invigilator-list-item',
  templateUrl: './invigilator-list-item.component.html',
  styleUrls: ['./invigilator-list-item.component.css']
})
export class InvigilatorListItemComponent implements OnInit {

  @Input() user: InvigilatorListingModel;

  constructor(private routeConfig: Router) {}

  ngOnInit() {
  }

  goToItem() {
    this.routeConfig.navigate([`invigilator-details/${this.user.id}`]);
  }

}

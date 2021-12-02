import { Component, OnInit, Input } from '@angular/core';
import { SLTListingModel } from '../models/SLT.listing.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-SLT-list-item',
  templateUrl: './slts-list-item.component.html',
  styleUrls: ['./slts-list-item.component.css']
})
export class SltsListItemComponent implements OnInit {

  @Input() user: SLTListingModel;

  constructor(private routeConfig: Router) {}

  ngOnInit() {
  }

  goToItem() {
    this.routeConfig.navigate([`slt-details/${this.user.id}`]);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { CentreListingModel } from '../models/centre.listing.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-centres-list-item',
  templateUrl: './centres-list-item.component.html',
  styleUrls: ['./centres-list-item.component.css']
})
export class CentresListItemComponent implements OnInit {

  @Input() centre: CentreListingModel;

  constructor(private routeConfig: Router) {}

  ngOnInit() {
  }

  goToItem() {
    this.routeConfig.navigate([`admin/centres-edit/${this.centre.id}`]);
  }

}

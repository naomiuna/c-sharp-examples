import { Component, OnInit, Input } from '@angular/core';
import { PageListingViewModel } from '../models/admin/page-listing.view.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-web-list-item',
  templateUrl: './web-list-item.component.html',
  styleUrls: ['./web-list-item.component.css']
})
export class WebListItemComponent implements OnInit {

  @Input() page: PageListingViewModel;

  constructor(private routeConfig: Router) {}

  ngOnInit() {
  }

  goToItem() {
    this.routeConfig.navigate([`admin/web-edit/${this.page.id}`]);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { OrganisationListingModel } from '../models/admin/organisation.listing.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-licence-management-list-item',
  templateUrl: './licence-management-list-item.component.html',
  styleUrls: ['./licence-management-list-item.component.css']
})
export class LicenceManagementListItemComponent implements OnInit {

  @Input() organisation: OrganisationListingModel;
  public licence: boolean;

  constructor(private routeConfig: Router) { }

  ngOnInit() {
    console.log(this.organisation.id);
    if(this.organisation.licence != null)
    {
      this.licence = true;
    }
    else
    {
      this.licence = false;
    }
  }

  goToItem() {
    this.routeConfig.navigate([`admin/organisations-details/${this.organisation.id}`]);
  }
}

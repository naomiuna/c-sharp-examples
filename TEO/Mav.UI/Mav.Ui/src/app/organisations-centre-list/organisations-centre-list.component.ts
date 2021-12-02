import { Component, OnInit, Input } from '@angular/core';
import { CentreListingModel } from '../models/centre.listing.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organisations-centre-list',
  templateUrl: './organisations-centre-list.component.html',
  styleUrls: ['./organisations-centre-list.component.css']
})
export class OrganisationsCentreListComponent implements OnInit {

  @Input() centre: CentreListingModel;

  constructor(private routeConfig: Router) 
  {
  }


  ngOnInit() {
  }

  goToItem() {
    this.routeConfig.navigate([`admin/centres-edit/${this.centre.id}`]);
  }
}

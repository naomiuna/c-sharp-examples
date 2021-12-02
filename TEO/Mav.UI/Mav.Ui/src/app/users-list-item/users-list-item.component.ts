import { Component, OnInit, Input } from '@angular/core';
import { UserListingModel } from '../models/user.listing.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list-item',
  templateUrl: './users-list-item.component.html',
  styleUrls: ['./users-list-item.component.css']
})
export class UsersListItemComponent implements OnInit {

  @Input() user: UserListingModel;

  constructor(private routeConfig: Router) {}

  ngOnInit() {
  }

  goToItem() {
    this.routeConfig.navigate([`admin/users-edit/${this.user.id}`]);
  }

}

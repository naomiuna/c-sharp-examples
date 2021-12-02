import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '../app.component.base';

@Component({
  selector: 'app-licence-management',
  templateUrl: './licence-management.component.html',
  styleUrls: ['./licence-management.component.css']
})
export class LicenceManagementComponent extends AppComponentBase implements OnInit {

  constructor(public routeConfig: Router) { 
    super(routeConfig);
  }

  ngOnInit() {
  }

}

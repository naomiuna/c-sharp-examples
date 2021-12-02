import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reporting-centre',
  templateUrl: './reporting-centre.component.html',
  styleUrls: ['./reporting-centre.component.css']
})
export class ReportingCentreComponent extends AppComponentBase implements OnInit {

  constructor(public routeConfig: Router) {
    super(routeConfig);
  }

  ngOnInit() {
  }

}
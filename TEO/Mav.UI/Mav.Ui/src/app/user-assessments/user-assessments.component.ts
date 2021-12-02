import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-assessments',
  templateUrl: './user-assessments.component.html',
  styleUrls: ['./user-assessments.component.css']
})
export class UserAssessmentsComponent extends AppComponentBase implements OnInit {

  constructor(public routeConfig: Router) {
    super(routeConfig);
  }

  ngOnInit() {
  }

}

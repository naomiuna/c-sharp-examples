import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '../app.component.base';

@Component({
  selector: 'app-assessments-create',
  templateUrl: './assessments-create.component.html',
  styleUrls: ['./assessments-create.component.css']
})
export class AssessmentsCreateComponent extends AppComponentBase implements OnInit {

  constructor(public routeConfig: Router) {
    super(routeConfig);
  }

  ngOnInit() {
  }

}

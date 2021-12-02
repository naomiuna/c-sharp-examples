import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessments-eo-qual-create',
  templateUrl: './assessments-eo-qual-create.component.html',
  styleUrls: ['./assessments-eo-qual-create.component.css']
})
export class AssessmentsEoQualCreateComponent extends AppComponentBase implements OnInit {

  constructor(public routeConfig: Router) {
    super(routeConfig);
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '../app.component.base';

@Component({
  selector: 'app-centres',
  templateUrl: './centres.component.html',
  styleUrls: ['./centres.component.css']
})
export class CentresComponent extends AppComponentBase implements OnInit {

  constructor(public routeConfig: Router) {
    super(routeConfig);
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '../app.component.base';

@Component({
  selector: 'app-invigilators',
  templateUrl: './invigilators.component.html',
  styleUrls: ['./invigilators.component.css']
})
export class InvigilatorsComponent extends AppComponentBase implements OnInit {

  constructor(public routeConfig: Router) {
    super(routeConfig);
  }

  ngOnInit() {
  }

}

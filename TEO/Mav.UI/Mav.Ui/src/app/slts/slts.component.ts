import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '../app.component.base';

@Component({
  selector: 'app-SLT',
  templateUrl: './slts.component.html',
  styleUrls: ['./slts.component.css']
})
export class SLTComponent extends AppComponentBase implements OnInit {

  constructor(public routeConfig: Router) {
    super(routeConfig);
  }

  ngOnInit() {
  }

}

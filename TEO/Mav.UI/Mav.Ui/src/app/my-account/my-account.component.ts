import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent extends AppComponentBase implements OnInit {

  constructor(public routeConfig: Router) {
    super(routeConfig);
  }

  ngOnInit() {
  }

}

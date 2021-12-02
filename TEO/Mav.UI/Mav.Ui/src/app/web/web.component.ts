import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router } from '@angular/router';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.css']
})
export class WebComponent extends AppComponentBase implements OnInit {

  public id = 0;

  constructor(
    public routeConfig: Router
  ) {
    super(routeConfig);
  }

  ngOnInit() {
  }

}

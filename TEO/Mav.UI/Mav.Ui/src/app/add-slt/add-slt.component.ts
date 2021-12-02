import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-slt',
  templateUrl: './add-slt.component.html',
  styleUrls: ['./add-slt.component.css']
})
export class AddSltComponent extends AppComponentBase implements OnInit {

  constructor(
    public routeConfig: Router
  ) {
    super(routeConfig);
  }

  public ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-licence-create',
  templateUrl: './licence-create.component.html',
  styleUrls: ['./licence-create.component.css']
})
export class LicenceCreateComponent extends AppComponentBase implements OnInit {

  constructor(
    public routeConfig: Router,
  ) 
  { 
    super(routeConfig);
  }

  ngOnInit() {

  }

}

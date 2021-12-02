import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organisations-create',
  templateUrl: './organisations-create.component.html',
  styleUrls: ['./organisations-create.component.css']
})
export class OrganisationsCreateComponent extends AppComponentBase implements OnInit {

  constructor(
    public routeConfig: Router
  ) 
  {
    super(routeConfig);
   }

  ngOnInit() {
  }

}

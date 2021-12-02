import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '../app.component.base';
import { CentreServiceService } from '../services/centre-service.service';
import { CentreViewModel } from '../models/centre.view.model';

@Component({
  selector: 'app-officers',
  templateUrl: './officers.component.html',
  styleUrls: ['./officers.component.css']
})
export class OfficersComponent extends AppComponentBase implements OnInit {

  constructor(
    public routeConfig: Router
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}

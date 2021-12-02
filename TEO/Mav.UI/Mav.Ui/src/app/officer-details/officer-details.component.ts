import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '../app.component.base';

@Component({
  selector: 'app-officer-details',
  templateUrl: './officer-details.component.html',
  styleUrls: ['./officer-details.component.css']
})
export class OfficerDetailsComponent  extends AppComponentBase implements OnInit {

  public id: string;

  constructor(
    public routeConfig: Router,
    private activeRoute: ActivatedRoute
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    const routeParams = this.activeRoute.snapshot.params;
    this.id = routeParams.id;
  }

}

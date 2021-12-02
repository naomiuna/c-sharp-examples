import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-invigilator',
  templateUrl: './add-invigilator.component.html',
  styleUrls: ['./add-invigilator.component.css']
})
export class AddInvigilatorComponent extends AppComponentBase implements OnInit {

  constructor(
    public routeConfig: Router
  ) {
    super(routeConfig);
  }

  public ngOnInit() {}
}

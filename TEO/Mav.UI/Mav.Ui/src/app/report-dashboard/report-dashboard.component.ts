import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router } from '@angular/router';
import { PermissionsServiceService } from '../services/permissions-service.service';

@Component({
  selector: 'app-report-dashboard',
  templateUrl: './report-dashboard.component.html',
  styleUrls: ['./report-dashboard.component.css']
})
export class ReportDashboardComponent extends AppComponentBase implements OnInit {

  constructor(
    public routeConfig: Router,
    private permissionsService: PermissionsServiceService) 
    {
      super(routeConfig);
    }

  ngOnInit() {
  }

  public isUserAdministrator(): boolean {
    return this.permissionsService.isUserAdministrator();
  }

  public isUserEditor(): boolean {
    return this.permissionsService.isUserEditor();
  }

}

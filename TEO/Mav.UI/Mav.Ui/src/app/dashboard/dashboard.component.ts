import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router } from '@angular/router';
import { User } from 'oidc-client';
import { AuthService } from '../services/auth.service';
import { PermissionsServiceService } from '../services/permissions-service.service';

declare function resetPageLayout(): any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends AppComponentBase implements OnInit {

  private user: User = null;
  public userName: string;

  constructor(
    public routeConfig: Router,
    private authService: AuthService,
    private permissionsService: PermissionsServiceService
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    resetPageLayout();
    this.user = this.authService.getUser();
    this.userName = this.user.profile.name;
  }

  public isUserExamOfficer(): boolean {
    return this.permissionsService.isUserExamOfficer();
  }

  public isUserExamInvigilator(): boolean {
    return this.permissionsService.isUserExamInvigilator();
  }

  public isUserAdministrator(): boolean {
    return this.permissionsService.isUserAdministrator();
  }

  public isUserEditor(): boolean {
    return this.permissionsService.isUserEditor();
  }

  public isUserSLT(): boolean {
    return this.permissionsService.isUserSLT();
  }

}

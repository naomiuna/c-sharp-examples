import { Component, OnInit, Inject } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../environments/environment';
import { PermissionsServiceService } from '../services/permissions-service.service';
import { AuthService} from '../services/auth.service';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent extends AppComponentBase implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: any,
    public routeConfig: Router,
    private permissionsService: PermissionsServiceService,
    private authService: AuthService
  ) {
    super(routeConfig);
  }

  ngOnInit() {
  }

  public goLogout(): void {
    // Delete session storage
    sessionStorage.clear();

    // Delete local storage
    localStorage.clear();

    // Redirect to IDP
    this.document.location.href = `${environment.portalBase}/umbraco/surface/Account/SignOut`;
    //Think this needs the LOGOUTID to be sent to make it log out of portal too
  }

  public goToChangePassword(): void {
    this.document.location.href = `${environment.authorityBase}Credentials/Update?returnUrl=${environment.appBase}`;
  }

  public goToPortal(): void {
    this.document.location.href = `${environment.portalBase}`;
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

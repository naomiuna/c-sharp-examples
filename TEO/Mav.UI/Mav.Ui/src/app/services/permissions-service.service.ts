import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { GlobalSettingsService } from './global-settings.service';

@Injectable()
export class PermissionsServiceService {

  constructor(
    private globalSettingsService: GlobalSettingsService,
    private authService: AuthService
  ) {
  }

  public isUserAdministrator(): boolean {
    return this.authService.getUserRole() === this.globalSettingsService.roles.administrator;
  }

  public isUserEditor(): boolean {
    return this.authService.getUserRole() === this.globalSettingsService.roles.editor;
  }

  public isUserExamOfficer(): boolean {
    return this.authService.getUserRole() === this.globalSettingsService.roles.examOfficer;
  }

  public isUserExamInvigilator(): boolean {
    return this.authService.getUserRole() === this.globalSettingsService.roles.examInvigilator;
  }

  public isUserSLT(): boolean {
    return this.authService.getUserRole() === this.globalSettingsService.roles.SLT;
  }

}

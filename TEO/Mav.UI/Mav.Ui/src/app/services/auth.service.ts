import { Injectable } from '@angular/core';
import { UserManagerSettings, UserManager, User } from 'oidc-client';
import { UserProfileModel } from '../models/user.profile.model';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  private manager: UserManager = new UserManager(getClientSettings());
  private user: User = null;

  constructor() {
    this.manager.getUser().then(user => {
      this.user = user;
    });
    this.manager.events.addSilentRenewError(function(){
      console.log('SilentRenewError.Event raised');
    });
  }

  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }

  testUserIsValid(): Promise<boolean> {
    return this.manager.getUser().then((user) => {
      if (user === null || user === undefined) {
          return Promise.reject(false);
      } else {
        return Promise.resolve(true);
      }
    });
  }

  getUser(): User {
    return this.user;
  }

  getUserRole(): string {
    if (!this.isLoggedIn()) {
      return '';
    }
    const claims = this.getClaims() as UserProfileModel;
    return claims.role;
  }

  getClaims(): any {
    return this.user.profile;
  }

  getAuthorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  startAuthentication(): Promise<void> {
    return this.manager.clearStaleState().then(() => {
      const args: any = {};
      this.manager.signinRedirect(args);
    });
  }

  completeAuthentication(): Promise<string> {
    return this.manager.signinRedirectCallback().then(user => {
      this.user = user;
      return Promise.resolve(this.user.id_token);
    }).catch(e => {
      console.log(`signinRedirectCallback error ${e}`);
      return Promise.reject(e);
    });
  }

  logout() : void{
    this.manager.createSignoutRequest();
  }

}

export function getClientSettings(): UserManagerSettings {
  return {
    authority: environment.authorityBase,
    client_id: 'exams_office',
    redirect_uri: `${environment.appBase}auth-callback`,
    post_logout_redirect_uri: environment.appBase,
    response_type: 'id_token token',
    scope: 'openid profile email roles mavapi',
    filterProtocolClaims: false,
    loadUserInfo: true,
    automaticSilentRenew: true,
    silent_redirect_uri: `${environment.appBase}silent-refresh.html`
  };
}

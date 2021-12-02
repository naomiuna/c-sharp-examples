import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {

  public authResponse: string;
  public isError = false;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.performHandshake();
  }

  performHandshake(): void {
    this.authService.completeAuthentication()
      .then(
        (val) => {
          this.authResponse = val;
          localStorage.setItem('noMatchingStateRedirected', null);
          this.router.navigateByUrl('dashboard');
        },
        (err) => {
          if (err.toString() === 'Error: No matching state found in storage') {
            const noMatchingStateRedirected = localStorage.getItem('noMatchingStateRedirected');
            if (noMatchingStateRedirected === null || noMatchingStateRedirected === undefined) {
              localStorage.setItem('noMatchingStateRedirected', 'Yes');
              this.retryHandshake();
            } else {
              this.authResponse = err;
              this.isError = true;
              console.error(err);
            }
          } else {
            this.authResponse = err;
            this.isError = true;
            console.error(err);
          }
        }
      );
  }

  retryHandshake(): void {
    this.document.location.href = '/dashboard';
  }
}

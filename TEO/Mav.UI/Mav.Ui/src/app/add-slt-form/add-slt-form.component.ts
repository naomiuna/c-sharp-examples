import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { GlobalSettingsService } from '../services/global-settings.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AppComponentBase } from '../app.component.base';
import { GenericResult } from '../models/generic.result.model';
import { EnumStatusCode } from '../models/generic.status';
import { AddSLTViewModel } from '../models/add.slt.view.model';
import { Email } from '../validators/email';
import { Required } from '../validators/required';
import { FormValidationService } from '../services/form-validation.service';

@Component({
  selector: 'app-add-slt-form',
  templateUrl: './add-slt-form.component.html',
  styleUrls: ['./add-slt-form.component.css']
})
export class AddSltFormComponent extends AppComponentBase implements OnInit {

  public userDetails: AddSLTViewModel = new AddSLTViewModel();

  public addSLTForm: FormGroup;
  public canAddMore = true;

  public get firstName(): AbstractControl { return this.addSLTForm.get('FirstName'); }
  public get surname(): AbstractControl { return this.addSLTForm.get('Surname'); }
  public get email(): AbstractControl { return this.addSLTForm.get('Email'); }

  constructor(
    public routeConfig: Router,
    private http: HttpClient,
    private readonly fb: FormBuilder,
    private globalSettingsService: GlobalSettingsService,
    private authService: AuthService,
    public validationService: FormValidationService
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.buildForm();
  }

  public submitForm(event) {
    this.validationService.markFormGroupTouched(this.addSLTForm);

    switch (event) {
        case 'AddOne' : this.saveChanges(false); break;
        case 'AddMore' : this.saveChanges(true); break;
        default : break;
    }
  }

  public cancelForm(): void {
    this.routeConfig.navigate(['/slts']);
  }

  public addAnother(): void {
    this.refreshScreenSkipLocation('/add-slt');
  }

  public saveChanges(addMore: boolean): void {
    console.log(`Add SLT: save changes called ${addMore}`);
    console.log(this.addSLTForm);
    this.resetForm();

    if (!this.addSLTForm.valid) {
      this.validationService.validateForm(this.addSLTForm, false, true);
      return;
    }

    this.userDetails.returnUrl = environment.clientId;
    this.userDetails.firstName = this.firstName.value;
    this.userDetails.surname = this.surname.value;
    this.userDetails.email = this.email.value;
    this.userDetails.confirmEmail = this.email.value;

    this.actionPending = true;
    this.addUser()
    .subscribe(
      r1 => {
        console.log(r1);
        this.actionPending = false;
        if (r1.status === EnumStatusCode.Ok) {
          this.updateOk = true;
        } else if (r1.status === EnumStatusCode.OkLimitReached) {
          this.updateOk = true;
          this.canAddMore = false;
        } else {
          this.error = r1.message;
        }
      },
      e1 => {
        console.log(e1);
        this.actionPending = false;
        this.error = `An unexpected error has occurred`;
      }
    );

  }

  public addUser(): Observable<GenericResult<string>> {
    const endPoint = `${environment.apiBase + this.globalSettingsService.apiUserEndpoints.createSLT}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.getAuthorizationHeaderValue()
      })
    };

    return this.http.post<AddSLTViewModel>(endPoint, this.userDetails, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  private buildForm(): void {
    this.addSLTForm = this.fb.group({
      FirstName: ['', Required('Please enter your first name')],
      Surname: ['', Required('Please enter your surname')],
      Email: ['', [Required('Please enter your email'), Email('Please enter a valid email address')]]
    });

    this.validationService.setFormFields(this.addSLTForm);

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.validationService.detectChangesInForm(this.addSLTForm);
  }

}

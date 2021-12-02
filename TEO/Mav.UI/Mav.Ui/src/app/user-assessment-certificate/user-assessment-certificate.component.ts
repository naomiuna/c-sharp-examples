import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '../app.component.base';
import { CertificateService } from '../services/certificate.service';
import { CertificateViewModel } from '../models/certificate.view.model';

@Component({
  selector: 'app-user-assessment-certificate',
  templateUrl: './user-assessment-certificate.component.html',
  styleUrls: ['./user-assessment-certificate.component.css']
})
export class UserAssessmentCertificateComponent extends AppComponentBase implements OnInit {

  public id: number; // UserAssessmentID

  public key: string; // KeyID

  public certificateModel: CertificateViewModel = new CertificateViewModel();

  constructor(
    public routeConfig: Router,
    private activeRoute: ActivatedRoute,
    private certificateService: CertificateService
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    const routeParams = this.activeRoute.snapshot.params;
    this.id = routeParams.id;
    this.key = routeParams.key;
    this.actionPending = true;
    this.certificateService.getCertificate(this.id, this.key)
    .subscribe(
      r1 => {
        console.log(r1);
        this.certificateModel = r1;
        this.actionPending = false;
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );
  }

  public goToAssessmentDetails(): void {
    this.routeConfig.navigate([`/user-assessment-details/${this.id}`]);
  }

}
